import React, { useState, useEffect } from "react";
import LogoutButton from "./LogoutButton";
import { db, auth } from "./firebaseConfig";
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
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const AccordionCarousel = () => {
  const [accordions, setAccordions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newAccordion, setNewAccordion] = useState({ title: "", content: "" });
  const [editModeIndex, setEditModeIndex] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const accordionsCollectionRef = collection(db, "accordions");

  // --- Auth State Listener ---
  useEffect(() => {
    console.groupCollapsed("AUTH FLOW START");
    console.log("AUTH: Auth listener setup initiated.");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(
        "AUTH: onAuthStateChanged callback fired. currentUser:",
        currentUser ? currentUser.uid : "null"
      );
      // setLoading(false) ko yahan se hata diya hai taaki `getAccordions` hi loading ko handle kare.
    });
    return () => {
      console.log("AUTH: Cleaning up auth listener.");
      unsubscribe();
      console.groupEnd();
    };
  }, []);

  // --- Data Fetching from Firestore (getDocs) ---
  useEffect(() => {
    const getAccordions = async () => {
      console.groupCollapsed("GET_ACCORDIONS_FLOW_START");
      console.log("GET_ACCORDIONS: Function called.");
      console.log(
        "GET_ACCORDIONS: Current 'user' state when called:",
        user ? user.uid : "null"
      );

      if (user) {
        setLoading(true);
        console.log(
          "GET_ACCORDIONS: User is logged in, setting loading to TRUE."
        );
        try {
          const q = query(
            accordionsCollectionRef,
            where("userId", "==", user.uid),
            orderBy("timestamp", "asc")
          );
          console.log(
            "GET_ACCORDIONS: Firestore query constructed for userId:",
            user.uid
          );

          const data = await getDocs(q);
          console.log(
            "GET_ACCORDIONS: Raw data received from getDocs:",
            data.docs.length,
            "documents."
          );
          // IMPORTANT: Check data.empty
          if (data.empty) {
            console.warn(
              "GET_ACCORDIONS: No documents found for this user in Firestore!"
            );
          }

          const fetchedAccordions = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          console.log(
            "GET_ACCORDIONS: Processed fetched accordions (id and data):",
            fetchedAccordions
          );

          // ***** POORA DHAYN YAHAN RELOAD PAR *****
          setAccordions(fetchedAccordions);
          console.log(
            "GET_ACCORDIONS: setAccordions called with fetched data. New accordions state length:",
            fetchedAccordions.length
          );

          // CurrentIndex adjustment logic (very critical for initial load and reloads)
          if (fetchedAccordions.length === 0) {
            console.log(
              "GET_ACCORDIONS: No accordions fetched, setting currentIndex to 0."
            );
            setCurrentIndex(0);
          } else if (currentIndex >= fetchedAccordions.length) {
            // Agar pehle se koi index tha jo ab out of bounds ho gaya hai (e.g., last item delete ho gaya)
            const newIdx = fetchedAccordions.length - 1;
            console.log(
              `GET_ACCORDIONS: currentIndex (${currentIndex}) out of bounds. Adjusting to ${newIdx}.`
            );
            setCurrentIndex(newIdx);
          } else {
            console.log(
              "GET_ACCORDIONS: currentIndex is valid, no adjustment needed."
            );
          }
        } catch (error) {
          console.error(
            "GET_ACCORDIONS ERROR: Error fetching accordions:",
            error
          );
        } finally {
          setLoading(false);
          console.log("GET_ACCORDIONS: Loading set to FALSE (fetch complete).");
        }
      } else {
        console.log(
          "GET_ACCORDIONS: User is NULL. Clearing accordions and setting loading to FALSE."
        );
        setAccordions([]);
        setLoading(false);
      }
      console.groupEnd();
    };

    // getAccordions ko tabhi call karein jab user state pata chal jaaye (null ya logged-in object)
    // Ye dependency user ka actual object/null value check karti hai, not just the uid.
    if (user !== undefined) {
      // 'undefined' initial state ko avoid karne ke liye
      getAccordions();
    }
  }, [user, currentIndex]); // Dependencies: 'user' ko pura include kiya, 'currentIndex' bhi.

  // --- Other functions (handleAdd, handleDelete, handleEditSave) unchanged for now ---

  const toggleActive = (id) => {
    setActiveId(activeId === id ? null : id);
    console.log("ACTION: Toggling active ID to", id);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIdx = prevIndex === accordions.length - 1 ? 0 : prevIndex + 1;
      console.log("ACTION: Navigating Next. From", prevIndex, "to", nextIdx);
      return nextIdx;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const prevIdx = prevIndex === 0 ? accordions.length - 1 : prevIndex - 1;
      console.log(
        "ACTION: Navigating Previous. From",
        prevIndex,
        "to",
        prevIdx
      );
      return prevIdx;
    });
  };

  const handleAdd = async () => {
    console.groupCollapsed("HANDLE_ADD_FLOW_START");
    console.log("HANDLE_ADD: Attempting to add new accordion.");
    if (newAccordion.title.trim() && newAccordion.content.trim() && user) {
      try {
        const docRef = await addDoc(accordionsCollectionRef, {
          title: newAccordion.title.trim(),
          content: newAccordion.content.trim(),
          userId: user.uid,
          timestamp: Date.now(),
        });
        setNewAccordion({ title: "", content: "" });
        console.log(
          "HANDLE_ADD: Document added to Firestore with ID:",
          docRef.id
        );

        const newlyAddedAccordion = {
          ...newAccordion,
          id: docRef.id,
          userId: user.uid,
          timestamp: Date.now(),
        };
        setAccordions((prev) => {
          const updated = [...prev, newlyAddedAccordion];
          console.log(
            "HANDLE_ADD: setAccordions called with new item. New array length:",
            updated.length
          );
          return updated;
        });

        // CurrentIndex ko naye item par set karein
        // setAccordions ke baad `accordions.length` current render cycle mein update nahi hota,
        // isliye hum naye length ka use kar sakte hain
        setCurrentIndex(accordions.length);
        console.log(
          "HANDLE_ADD: Setting currentIndex to new item's position:",
          accordions.length
        );
      } catch (error) {
        console.error("HANDLE_ADD ERROR:", error);
        alert("Failed to add accordion. Please try again.");
      }
    } else if (!user) {
      alert("Please login to add accordions.");
      console.log("HANDLE_ADD: User not logged in.");
    } else {
      alert("Please enter both title and content for the accordion.");
      console.log("HANDLE_ADD: Missing title or content.");
    }
    console.groupEnd();
  };

  const handleDelete = async (idToDelete) => {
    console.groupCollapsed("HANDLE_DELETE_FLOW_START");
    console.log(
      "HANDLE_DELETE: Attempting to delete accordion with ID:",
      idToDelete
    );
    if (!user) {
      alert("Please login to delete accordions.");
      console.log("HANDLE_DELETE: User not logged in.");
      return;
    }
    try {
      const accordionDoc = doc(db, "accordions", idToDelete);
      await deleteDoc(accordionDoc);
      console.log(
        "HANDLE_DELETE: Document deleted from Firestore:",
        idToDelete
      );

      const updated = accordions.filter((item) => item.id !== idToDelete);
      setAccordions(updated);
      console.log(
        "HANDLE_DELETE: setAccordions called. New array length:",
        updated.length
      );

      if (currentIndex >= updated.length && updated.length > 0) {
        console.log(
          "HANDLE_DELETE: currentIndex adjusted due to deletion (out of bounds)."
        );
        setCurrentIndex(updated.length - 1);
      } else if (updated.length === 0) {
        console.log(
          "HANDLE_DELETE: All accordions deleted. Setting currentIndex to 0."
        );
        setCurrentIndex(0);
      } else {
        console.log("HANDLE_DELETE: currentIndex is fine after deletion.");
      }
    } catch (error) {
      console.error("HANDLE_DELETE ERROR:", error);
      alert("Failed to delete accordion. Please try again.");
    }
    console.groupEnd();
  };

  const handleEditSave = async (index, newTitle, newContent) => {
    console.groupCollapsed("HANDLE_EDIT_SAVE_FLOW_START");
    console.log(
      "HANDLE_EDIT_SAVE: Attempting to save changes for index:",
      index
    );
    if (!user) {
      alert("Please login to edit accordions.");
      console.log("HANDLE_EDIT_SAVE: User not logged in.");
      return;
    }
    const accordionToUpdate = accordions[index];
    if (!accordionToUpdate) {
      console.warn("HANDLE_EDIT_SAVE: No accordion found at index", index);
      console.groupEnd();
      return;
    }

    if (
      accordionToUpdate.title === newTitle &&
      accordionToUpdate.content === newContent
    ) {
      setEditModeIndex(null);
      console.log("HANDLE_EDIT_SAVE: No changes detected, exiting edit mode.");
      console.groupEnd();
      return;
    }

    try {
      const accordionDoc = doc(db, "accordions", accordionToUpdate.id);
      await updateDoc(accordionDoc, {
        title: newTitle.trim(),
        content: newContent.trim(),
      });
      console.log(
        "HANDLE_EDIT_SAVE: Document updated in Firestore:",
        accordionToUpdate.id
      );

      setAccordions((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          title: newTitle.trim(),
          content: newContent.trim(),
        };
        console.log(
          "HANDLE_EDIT_SAVE: setAccordions called. Updated array for index:",
          index,
          updated[index]
        );
        return updated;
      });
      setEditModeIndex(null);
    } catch (error) {
      console.error("HANDLE_EDIT_SAVE ERROR:", error);
      alert("Failed to save changes. Please try again.");
    }
    console.groupEnd();
  };

  // ***** YEH LINE HAR RENDER PAR CHALTI HAI *****
  const current = accordions[currentIndex];
  console.groupCollapsed("--- RENDER CYCLE ---");
  console.log("RENDER: Current accordions state:", accordions);
  console.log("RENDER: Current currentIndex:", currentIndex);
  console.log("RENDER: Accordion to display ('current'):", current);
  console.log("RENDER: Is 'current' valid (truthy)?", !!current);
  console.log("RENDER: 'current' has ID?", current?.id);
  console.groupEnd();

  // --- Conditional Rendering based on Loading and User State ---
  if (loading) {
    console.log("RENDER PATH: Loading screen.");
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Loading Accordions...
      </div>
    );
  }

  if (!user) {
    console.log("RENDER PATH: Not logged in screen. User is null.");
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <p>Please login to view and manage your accordions.</p>
      </div>
    );
  }

  console.log("RENDER PATH: Main Accordion Carousel UI.");

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <h2>Accordion Carousel</h2>
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
                value={current?.title || ""}
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
                value={current?.content || ""}
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
                  handleEditSave(
                    currentIndex,
                    current?.title || "",
                    current?.content || ""
                  )
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
                onClick={() => current && toggleActive(current.id)}
                style={{ cursor: "pointer" }}>
                <h3>{current?.title}</h3>
                <span>{activeId === current?.id ? "−" : "+"}</span>
              </div>
              {activeId === current?.id && <p>{current?.content}</p>}
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
                onClick={() => current && handleDelete(current.id)}
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
