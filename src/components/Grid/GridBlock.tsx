
import React from "react";
import { number } from "zod/v4";

const GridBlock = ({ span }: { span: number }) => {
  const duration = 2 + Math.random() * 3;
  const delay = Math.random() * 2;
  const spanClasses = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  6: "col-span-6",
  7: "col-span-7",
};
  return (
    <div
      className={`dark:bg-gray-900 hidden rounded ${spanClasses[span as keyof typeof spanClasses]} animate-pulse`}
      style={{ animation: `pulse ${duration}s ease-in-out ${delay}s infinite` }}
    ></div>
  );
};

export default GridBlock;
