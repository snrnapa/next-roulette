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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // 選ばれたインデックス
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // ルーレットの動作管理

  const screenHeight = typeof window !== "undefined" ? window.innerHeight : 960;
  const itemHeight = 60; // 1アイテムの高さ
  const maxScroll = itemHeight * items.length - screenHeight; // 最大スクロール範囲

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
        const nextPosition = prev + itemHeight;
        if (nextPosition >= maxScroll) {
          setCurrentIndex((prevIndex) =>
            prevIndex >= items.length - 1 ? 0 : prevIndex + 1
          );
          return 0; // 最大スクロールを越えないようにリセット
        }
        return nextPosition;
      });
    }, 16); // 速度調整
  };

  // ルーレットを停止する関数
  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // タイマー停止
      intervalRef.current = null; // リファレンスをリセット
      setSelectedIndex(currentIndex); // 停止した時点で選ばれたインデックスを保存
    }
  };

  return (
    <div
      onClick={toggle}
      className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-950"
    >
      <div className="flex justify-center items-center w-full h-full">
        <div
          className="flex flex-col relative overflow-hidden" // 親divにrelativeとoverflow-hiddenを追加
          style={{
            height: screenHeight, // 親要素の高さを画面全体に合わせる
          }}
        >
          <div
            className="flex flex-col absolute" // 子要素にabsoluteを指定
            style={{
              top: `${positionY}px`, // 親要素内で動く位置を指定
              // transition: "top 0.16s ease", // transitionを一時的に外してみる
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
    </div>
  );
};

export default Roulette;
