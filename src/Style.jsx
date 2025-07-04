import React from "react";
import AccordionCarousel from "./AccordionCarousel";
import theoryData from "./TheoryData";

const Style = () => {
  return (
    <div>
      <AccordionCarousel questionData={theoryData.style} />
    </div>
  );
};

export default Style;
