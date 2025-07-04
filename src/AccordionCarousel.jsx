import React, { useState } from "react";

const AccordionCarousel = ({ questionData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeId, setActiveId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const totalItems = questionData.data.length;

  const toggleActive = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const nextAccordion = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
    setActiveId(null); // collapse accordion on next
  };

  const prevAccordion = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    setActiveId(null); // collapse accordion on prev
  };

  const currentItem = questionData.data[currentIndex];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{questionData.heading}</h2>
      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Search Questions"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div style={styles.card}>
        <div
          style={styles.questionHeader}
          onClick={() => toggleActive(currentItem.id)}>
          <h3 style={styles.question}>{currentItem.query}</h3>
          <span style={styles.toggle}>
            {activeId === currentItem.id ? "−" : "+"}
          </span>
        </div>

        {activeId === currentItem.id && (
          <p style={styles.answer}>{currentItem.answer}</p>
        )}
      </div>

      <div style={styles.buttonGroup}>
        <button onClick={prevAccordion} style={styles.button}>
          ⬅️ Previous
        </button>
        <button onClick={nextAccordion} style={styles.button}>
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default AccordionCarousel;

const styles = { 
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "20px",
    textAlign: "left",
    backgroundColor: "#f9f9f9",
  },
  questionHeader: {
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  question: {
    fontSize: "18px",
    fontWeight: "600",
  },
  toggle: {
    fontSize: "20px",
  },
  answer: {
    marginTop: "10px",
    fontSize: "16px",
    color: "#333",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
