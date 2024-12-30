"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [names, setNames] = useState([
    "藤岡弘",
    "阿部寛",
    "五木ひろし",
    "ヒロシ",
    "なかやまきんに君",
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

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setPositionX((prev) => {
          if (prev >= screenWidth) {
            setCurrentIndex((prevIndex) =>
              prevIndex >= names.length - 1 ? 0 : prevIndex + 1
            );
            return 0;
          }
          return prev + 60;
        });
      }, 5);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, names.length, screenWidth]);

  const handleToggle = () => {
    if (isRunning) {
      setIsRunning(false);
      setTimeout(() => {
        setIsSelected(true);
      }, 1000);
    } else {
      setIsRunning(true);
      setIsSelected(false);
    }
  };

  const handleDefineName = () => {
    const inputNames = nameInput.split(",");
    if (inputNames.length < 3) {
      setIsError(true);
      return;
    }
    setIsError(false);
    setNames(inputNames);
    setIsDefine(true);
    setTimeout(() => {
      setIsDefine(false);
    }, 2000);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-r from-purple-500 to-blue-500 text-slate-200">
      <button
        className="h-screen w-full flex items-center justify-center relative overflow-hidden"
        disabled={isSelected}
        onClick={handleToggle}
      >
        <div
          className="absolute"
          style={{
            transform: `translateX(${positionX - screenWidth}px)`,
          }}
        >
          <span className="font-bold text-3xl">
            {names[(currentIndex + 2) % names.length]}
          </span>
        </div>
        <div
          className="absolute"
          style={{
            transform: `translateX(${positionX - screenWidth / 2}px)`,
          }}
        >
          <span className="font-bold text-5xl">
            {names[(currentIndex + 1) % names.length]}
          </span>
        </div>
        <div
          className="absolute"
          style={{
            transform: `translateX(${positionX}px)`,
          }}
        >
          <span
            className={`font-bold text-6xl ${
              isSelected ? "text-yellow-400" : ""
            }`}
          >
            {names[currentIndex]}
          </span>
        </div>
      </button>
      <div className="fixed top-0 right-0 m-4">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-white text-black p-2 rounded"
        >
          設定
        </button>
        {isOpen && (
          <div className="absolute bg-white text-black p-4 rounded shadow-md">
            <textarea
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="resize-y w-full p-2 border rounded mb-2"
              rows="5"
            />
            <button
              onClick={handleDefineName}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded"
            >
              決定
            </button>
            {isError && (
              <p className="text-red-500 mt-2">3人以上入力してください！</p>
            )}
          </div>
        )}
      </div>
      {isDefine && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
          設定しました！
        </div>
      )}
    </div>
  );
}
