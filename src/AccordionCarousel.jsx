import React, { useState, useEffect } from "react";
import LogoutButton from "./LogoutButton"; // Agar aapke paas yeh component hai
import { db, auth } from "./firebaseConfig"; // Firestore `db` aur Auth `auth` ko import karein
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore"; // Firestore methods
import { onAuthStateChanged } from "firebase/auth"; // Auth listener to get current user UID

const AccordionCarousel = () => {
  const [accordions, setAccordions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newAccordion, setNewAccordion] = useState({ title: "", content: "" });
  const [editModeIndex, setEditModeIndex] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // Current logged-in user

  // Firestore collection reference
  const accordionsCollectionRef = collection(db, "accordions");

  // --- Auth State Listener to get current user ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Auth status is known
    });
    return () => unsubscribe();
  }, []);

  // --- Data Fetching from Firestore ---
  useEffect(() => {
    const getAccordions = async () => {
      if (user) {
        // Fetch data only if user is logged in
        setLoading(true);
        try {
          // Query to get only accordions belonging to the current user
          const q = query(
            accordionsCollectionRef,
            where("userId", "==", user.uid), // Filter by userId
            orderBy("timestamp", "asc") // Order by creation time
          );
          const data = await getDocs(q);
          const fetchedAccordions = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id, // Firestore document ID ko `id` banayein
          }));
          setAccordions(fetchedAccordions);
          // Agar koi accordions nahi hain, toh current index ko reset karein
          if (fetchedAccordions.length === 0) {
            setCurrentIndex(0);
          } else if (currentIndex >= fetchedAccordions.length) {
            setCurrentIndex(0); // Agar current index out of bounds ho jaye
          }
        } catch (error) {
          console.error("Error fetching accordions:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setAccordions([]); // User logged out, clear accordions
        setLoading(false);
      }
    };

    getAccordions();
  }, [user]); // Rerun when user state changes

  const toggleActive = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === accordions.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? accordions.length - 1 : prevIndex - 1
    );
  };

  // --- Add Accordion to Firestore ---
  const handleAdd = async () => {
    if (newAccordion.title && newAccordion.content && user) {
      try {
        const docRef = await addDoc(accordionsCollectionRef, {
          title: newAccordion.title,
          content: newAccordion.content,
          userId: user.uid, // Current user ka ID store karein
          timestamp: Date.now(), // Creation time stamp
        });
        // Frontend state ko update karein Firestore ID ke saath
        setAccordions((prev) => [
          ...prev,
          {
            ...newAccordion,
            id: docRef.id,
            userId: user.uid,
            timestamp: Date.now(),
          },
        ]);
        setNewAccordion({ title: "", content: "" });
        // Naye item par navigate karein
        setCurrentIndex(accordions.length);
      } catch (error) {
        console.error("Error adding accordion:", error);
      }
    } else if (!user) {
      alert("Please login to add accordions.");
    }
  };

  // --- Delete Accordion from Firestore ---
  const handleDelete = async (idToDelete) => {
    if (!user) {
      alert("Please login to delete accordions.");
      return;
    }
    try {
      const accordionDoc = doc(db, "accordions", idToDelete);
      await deleteDoc(accordionDoc);
      const updated = accordions.filter((item) => item.id !== idToDelete);
      setAccordions(updated);
      // Agar current accordion delete ho gaya, toh index adjust karein
      if (currentIndex >= updated.length && updated.length > 0) {
        setCurrentIndex(updated.length - 1);
      } else if (updated.length === 0) {
        setCurrentIndex(0);
      }
    } catch (error) {
      console.error("Error deleting accordion:", error);
    }
  };

  // --- Edit/Save Accordion to Firestore ---
  const handleEditSave = async (index, newTitle, newContent) => {
    if (!user) {
      alert("Please login to edit accordions.");
      return;
    }
    const accordionToUpdate = accordions[index];
    if (!accordionToUpdate) return;

    try {
      const accordionDoc = doc(db, "accordions", accordionToUpdate.id);
      await updateDoc(accordionDoc, {
        title: newTitle,
        content: newContent,
      });
      // Frontend state ko update karein
      const updated = [...accordions];
      updated[index] = {
        ...updated[index],
        title: newTitle,
        content: newContent,
      };
      setAccordions(updated);
      setEditModeIndex(null);
    } catch (error) {
      console.error("Error updating accordion:", error);
    }
  };

  const current = accordions[currentIndex];

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Loading Accordions...
      </div>
    );
  }

  // Agar user logged out hai, toh dikhayein ki content login ke baad available hoga
  if (!user) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <p>Please login to view and manage your accordions.</p>
        {/* Optional: Add a link to login/register */}
        {/* <Link to="/login">Go to Login</Link> */}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <h2>Accordion Carousel</h2>
        {/* Logout button ko yahan render karein agar aapne alag component nahi banaya hai */}
        {/* Agar aapke paas LogoutButton component hai toh use karein */}
        <LogoutButton />
      </div>

      {accordions.length > 0 ? (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "10px",
          }}>
          {editModeIndex === currentIndex ? (
            <>
              <input
                type="text"
                value={current.title}
                onChange={(e) =>
                  setAccordions((prev) =>
                    prev.map((acc, idx) =>
                      idx === currentIndex
                        ? { ...acc, title: e.target.value }
                        : acc
                    )
                  )
                }
                style={{ width: "90%", padding: "8px", marginBottom: "10px" }}
              />
              <textarea
                value={current.content}
                onChange={(e) =>
                  setAccordions((prev) =>
                    prev.map((acc, idx) =>
                      idx === currentIndex
                        ? { ...acc, content: e.target.value }
                        : acc
                    )
                  )
                }
                style={{ width: "90%", padding: "8px", minHeight: "80px" }}
              />
              <button
                onClick={() =>
                  handleEditSave(currentIndex, current.title, current.content)
                }
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginRight: "5px",
                }}>
                Save
              </button>
            </>
          ) : (
            <div>
              <div
                onClick={() => toggleActive(current.id)}
                style={{ cursor: "pointer" }}>
                <h3>{current.title}</h3>
                <span>{activeId === current.id ? "−" : "+"}</span>
              </div>
              {activeId === current.id && <p>{current.content}</p>}
              <button
                onClick={() => setEditModeIndex(currentIndex)}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#ffc107",
                  color: "black",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginRight: "5px",
                }}>
                Edit
              </button>
              <button
                onClick={() => handleDelete(current.id)}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}>
                Delete
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>No accordions to display. Add a new one!</p>
      )}

      {/* Carousel navigation buttons */}
      {accordions.length > 1 && (
        <div style={{ marginTop: "10px" }}>
          <button
            onClick={handlePrev}
            style={{
              padding: "8px 12px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "5px",
            }}>
            ⟨ Prev
          </button>
          <button
            onClick={handleNext}
            style={{
              padding: "8px 12px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}>
            Next ⟩
          </button>
        </div>
      )}

      <div
        style={{
          marginTop: "20px",
          borderTop: "1px solid #eee",
          paddingTop: "20px",
        }}>
        <h4>Add New Accordion</h4>
        <input
          type="text"
          placeholder="Title"
          value={newAccordion.title}
          onChange={(e) =>
            setNewAccordion({ ...newAccordion, title: e.target.value })
          }
          style={{
            width: "calc(100% - 20px)",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <textarea
          placeholder="Content"
          value={newAccordion.content}
          onChange={(e) =>
            setNewAccordion({ ...newAccordion, content: e.target.value })
          }
          style={{
            width: "calc(100% - 20px)",
            padding: "10px",
            minHeight: "80px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleAdd}
          style={{
            padding: "10px 15px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}>
          Add Accordion
        </button>
      </div>
    </div>
  );
};

export default AccordionCarousel;
