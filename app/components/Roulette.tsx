"use client";

import { useState } from "react";

const items = ["Red", "Blue", "Green", "Yellow", "Purple"];

const Roulette = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [spinning, setSpinning] = useState(false);

  const spinRoulette = () => {
    setSpinning(true);
    const randomIndex: number = Math.floor(Math.random() * items.length);
    setTimeout(() => {
      setSelectedIndex(randomIndex);
      setSpinning(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className={`relative w-40 h-40 border-4 border-gray-500 rounded-full overflow-hidden ${
          spinning ? "animate-spin" : ""
        }`}
      >
        <ul
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `rotate(${
              (selectedIndex !== null ? selectedIndex : 0) *
              (360 / items.length)
            }deg)`,
          }}
        >
          {items.map((item, index) => (
            <li
              key={index}
              className="absolute text-center"
              style={{
                transform: `rotate(${
                  index * (360 / items.length)
                }deg) translate(0, -50%)`,
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={spinRoulette}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400"
        disabled={spinning}
      >
        Spin
      </button>
      {selectedIndex !== null && !spinning && (
        <p className="mt-4 text-lg">
          Result: <span className="font-bold">{items[selectedIndex]}</span>
        </p>
      )}
    </div>
  );
};

export default Roulette;
