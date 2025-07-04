import React from "react";
import AccordionCarousel from "./AccordionCarousel";
import practicalData from "./PracticalData";
const Pstyle = () => {
  return (
    <div>
      <AccordionCarousel questionData={practicalData.pstyle} />
    </div>
  );
};

export default Pstyle;
