import React, { useState } from "react";

const AccordionCarousel = () => {
  const [accordions, setAccordions] = useState([
    { id: 1, title: "Accordion 1", content: "Content for accordion 1" },
    { id: 2, title: "Accordion 2", content: "Content for accordion 2" },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newAccordion, setNewAccordion] = useState({ title: "", content: "" });
  const [editModeIndex, setEditModeIndex] = useState(null);
  const [activeId, setActiveId] = useState(null);

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

  const handleAdd = () => {
    if (newAccordion.title && newAccordion.content) {
      const newItem = {
        id: Date.now(),
        title: newAccordion.title,
        content: newAccordion.content,
      };
      setAccordions([...accordions, newItem]);
      setNewAccordion({ title: "", content: "" });
    }
  };

  const handleDelete = (id) => {
    const updated = accordions.filter((item) => item.id !== id);
    setAccordions(updated);
    setCurrentIndex(0);
  };

  const handleEditSave = (index, title, content) => {
    const updated = [...accordions];
    updated[index] = { ...updated[index], title, content };
    setAccordions(updated);
    setEditModeIndex(null);
  };

  const current = accordions[currentIndex];

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2>Accordion Carousel</h2>

      {current && (
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
              />
              <button
                onClick={() =>
                  handleEditSave(currentIndex, current.title, current.content)
                }>
                Save
              </button>
            </>
          ) : (
            <div onClick={() => toggleActive(current.id)}>
              <h3>{current.title}</h3>
              <span>{activeId === current.id ? "−" : "+"}</span>
              {activeId === current.id && <p>{current.content}</p>}
              <button onClick={() => setEditModeIndex(currentIndex)}>
                Edit
              </button>
              <button onClick={() => handleDelete(current.id)}>Delete</button>
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: "10px" }}>
        <button onClick={handlePrev}>⟨ Prev</button>
        <button onClick={handleNext}>Next ⟩</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h4>Add New Accordion</h4>
        <input
          type="text"
          placeholder="Title"
          value={newAccordion.title}
          onChange={(e) =>
            setNewAccordion({ ...newAccordion, title: e.target.value })
          }
        />
        <textarea
          placeholder="Content"
          value={newAccordion.content}
          onChange={(e) =>
            setNewAccordion({ ...newAccordion, content: e.target.value })
          }
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
};

export default AccordionCarousel;
