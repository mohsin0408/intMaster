import React from "react";
import AccordionCarousel from "./AccordionCarousel";
import theoryData from "./TheoryData";

const Script = () => {
  return (
    <div>
      <AccordionCarousel questionData={theoryData.script} />
    </div>
  );
};

export default Script;
