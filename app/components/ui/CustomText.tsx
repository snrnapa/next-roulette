import React from "react";

export const RouletteText = ({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) => {
  return (
    <div>
      {index % 2 === 0 ? (
        <div>
          <p className="font-bold text-5xl text-sky-400">{children}</p>
        </div>
      ) : (
        <div>
          <p className="font-bold text-5xl text-white">{children}</p>
        </div>
      )}
    </div>
  );
};
