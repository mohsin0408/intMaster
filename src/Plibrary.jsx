import React from "react";
import AccordionCarousel from "./AccordionCarousel";
import practicalData from "./PracticalData";

const Plibrary = () => {
  return (
    <div>
      <AccordionCarousel questionData={practicalData.preact} />
    </div>
  );
};

export default Plibrary;
