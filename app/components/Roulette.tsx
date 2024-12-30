"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [items, setItems] = useState([
    // "藤岡弘",
    // "阿部寛",
    // "五木ひろし",
    // "ヒロシ",
    // "なかやまきんに君",
    "+90kg",
    "-90kg",
    "+80kg",
    "-80kg",
    "+700kg",
    "-700kg",
  ]);
  const [nameInput, setNameInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [positionX, setPositionX] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isOneMove, setIsOneMove] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDefine, setIsDefine] = useState(false);

  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 960;

  // useEffect(() => {
  //   let timer;
  //   if (isRunning) {
  //     timer = setInterval(() => {
  //       setPositionX((prev) => {
  //         if (prev >= screenWidth) {
  //           setCurrentIndex((prevIndex) =>
  //             prevIndex >= names.length - 1 ? 0 : prevIndex + 1
  //           );
  //           return 0;
  //         }
  //         return prev + 60;
  //       });
  //     }, 5);
  //   } else {
  //     clearInterval(timer);
  //   }
  //   return () => clearInterval(timer);
  // }, [isRunning, items.length, screenWidth]);

  return (
    <div className="min-h-screen h-80 overflow-hidden  relative flex flex-col justify-center">
      <div className="roulette-content flex flex-col space-y-4 ">
        {items.map((item, index) => (
          <div
            key={index}
            className="text-2xl font-semibold text-center p-4  text-white  shadow-md tracking-widest  "
          >
            {item}
          </div>
        ))}
      </div>
      <button className="btn glass">開始</button>
    </div>
  );
}
