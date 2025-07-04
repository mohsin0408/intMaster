import React from "react";
import AccordionCarousel from "./AccordionCarousel";
import theoryData from "./TheoryData";

const Library = () => {
  return (
    <div>
      <AccordionCarousel questionData={theoryData.react} />
    </div>
  );
};

export default Library;
