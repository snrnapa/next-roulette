import React from "react";

export const RouletteText = ({
  children,
  index,
  isSelected,
}: {
  children: React.ReactNode;
  index: number;
  isSelected: boolean;
}) => {
  return (
    <div>
      {index % 2 === 0 ? (
        <div>
          <p
            className={`${
              isSelected ? "scale-125 transition-all duration-500" : ""
            } font-bold text-3xl sm:text-5xl h-full w-full text-sky-400`}
          >
            {children}
          </p>
        </div>
      ) : (
        <div>
          <p
            className={`${
              isSelected ? "scale-125 transition-all duration-500" : ""
            } font-bold text-3xl sm:text-5xl text-white`}
          >
            {children}
          </p>
        </div>
      )}
    </div>
  );
};
