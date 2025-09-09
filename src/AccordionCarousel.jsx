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
    setActiveId(null);
  };

  const prevAccordion = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    setActiveId(null);
  };

  const currentItem = questionData.data[currentIndex];

  return (
    <div className="max-w-xl px-4 mx-auto mt-10 font-sans text-center">
      <h2 className="mb-5 text-2xl font-bold">{questionData.heading}</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Questions"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="p-4 mb-6 text-left bg-gray-100 border border-gray-300 rounded-lg">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleActive(currentItem.id)}>
          <h3 className="text-lg font-semibold">{currentItem.query}</h3>
          <span className="text-xl">
            {activeId === currentItem.id ? "−" : "+"}
          </span>
        </div>

        {activeId === currentItem.id && (
          <p className="mt-3 text-base text-gray-800 whitespace-pre-wrap ">
            {currentItem.answer}
          </p>
        )}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={prevAccordion}
          className="px-5 py-2 text-white transition bg-blue-500 rounded-md hover:bg-blue-600">
          ← Previous
        </button>
        <button
          onClick={nextAccordion}
          className="px-5 py-2 text-white transition bg-blue-500 rounded-md hover:bg-blue-600">
          Next →
        </button>
      </div>
    </div>
  );
};

export default AccordionCarousel;
