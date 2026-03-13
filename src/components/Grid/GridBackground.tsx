
import React from "react";
import GridBlock from "./GridBlock";

const GridBackground = () => {
  return (
    <div className="absolute inset-0 p-2 grid grid-cols-12 gap-2 transform -skew-y-12 scale-150">
      {
        Array.from({length:48}).map((_,i) => <GridBlock key={i} span={2}/>)
      }
      
    </div>
  );
};

export default GridBackground;
