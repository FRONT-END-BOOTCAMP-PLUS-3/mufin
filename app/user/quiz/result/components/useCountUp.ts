"use client";

import { useEffect, useState } from "react";

// 🎯 카운트 애니메이션을 위한 커스텀 훅
export const useCountUp = (num: number=50000, duration: number=1500) => {
  const [count, setCount] = useState(0);
  const frameRate = 1000 / 60; // 60FPS
  const totalFrame = Math.round(duration / frameRate);

  useEffect(() => {
    let currentNumber = 0;

    const counter = setInterval(() => {
      const progressRate = ++currentNumber / totalFrame;
      setCount(Math.round(num * progressRate));

      if (progressRate === 1) {
        clearInterval(counter);
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [num, duration]);

  return count;
};

