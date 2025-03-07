"use client";
import React, { useEffect, useState } from "react";
import { Particle, ParticleAfter } from "@/app/user/quiz/result/components/Firework.Style";

const Fireworks = () => {
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowFireworks(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {showFireworks && (
        <>
          <Particle />
          <ParticleAfter />
        </>
      )}
    </>
  );
};

export default Fireworks;