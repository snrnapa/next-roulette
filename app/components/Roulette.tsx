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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const screenHeight = typeof window !== "undefined" ? window.innerHeight : 960;
  const ITEM_HEIGHT = 60; // 1アイテムの高さ
  const maxScroll = ITEM_HEIGHT * items.length - screenHeight; // 最大スクロール範囲

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
        const nextPosition = prev + ITEM_HEIGHT;
        if (nextPosition >= items.length * ITEM_HEIGHT) {
          return 0;
        }
        return nextPosition;
      });
    }, 50); // 更新間隔
  };

  // ルーレットを停止する関数
  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // タイマー停止
      intervalRef.current = null; // リファレンスをリセット
      const closesIntex = Math.round(positionY / ITEM_HEIGHT) % items.length;
      setSelectedIndex(closesIntex); // 停止した時点で選ばれたインデックスを保存
      console.log(closesIntex);
    }
  };

  return (
    <div
      onClick={toggle}
      className="flex justify-center  items-center min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-950 "
    >
      <div className="h-8 w-full flex flex-col   justify-center items-center  ">
        <div
          className="  space-y-28"
          style={{
            transform: `translateY(-${positionY}px)`,
            transition: isRunning ? "transform 0.1s linear" : "none",
          }}
        >
          {items.map((item, index) => (
            <RouletteText
              key={index}
              index={index}
              isSelected={selectedIndex === index} // 選ばれた文字を強調
            >
              {item}
            </RouletteText>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roulette;
