import React from "react";
import AccordionCarousel from "./AccordionCarousel";
import theoryData from "./TheoryData";

const Text = () => {
  return (
    <div>
      <AccordionCarousel questionData={theoryData.text} />
    </div>
  );
};

export default Text;
