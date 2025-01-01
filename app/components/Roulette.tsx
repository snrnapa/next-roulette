"use client";

import { useState, useRef } from "react";
import { RouletteText } from "./ui/CustomText";

const Roulette = () => {
  const [items] = useState<string[]>([
    "藤岡弘",
    "阿部寛",
    "五木ひろし",
    "ヒロシ",
    "なかやまきんに君",
  ]);
  const [positionY, setPositionY] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // ルーレットの動作管理

  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 960;

  // トグル関数
  const toggle = () => {
    if (isRunning) {
      stop(); // 停止処理を実行
    } else {
      move(); // 開始処理を実行
    }
    setIsRunning(!isRunning);
  };

  // ルーレットを動かす関数
  const move = () => {
    if (intervalRef.current) return; // 二重実行防止
    intervalRef.current = setInterval(() => {
      setPositionY((prev) => {
        if (prev >= screenWidth) {
          setCurrentIndex((prevIndex) =>
            prevIndex >= items.length - 1 ? 0 : prevIndex + 1
          );
          return 0;
        }
        return prev + 60;
      });
    }, 16); // 速度調整
  };

  // ルーレットを停止する関数
  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // タイマー停止
      intervalRef.current = null; // リファレンスをリセット
      setPositionY(0); // ポジションをリセット
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-950 ">
      <button className="h-screen w-screen" onClick={toggle}>
        <div className=" text-center w-screen h-screen  items-center flex flex-col justify-center relative overflow-hidden">
          <div
            className="absolute"
            style={{
              transform: `translateY(${positionY}px)`,
            }}
          >
            <RouletteText index={currentIndex}>
              {items[currentIndex]}
            </RouletteText>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Roulette;
