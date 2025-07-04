import React from "react";
import AccordionCarousel from "./AccordionCarousel";
import practicalData from "./PracticalData";

const Pscript = () => {
  return (
    <div>
      <AccordionCarousel questionData={practicalData.pscript} />
    </div>
  );
};

export default Pscript;
