"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const badgeVariants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1.1, 1],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const dollarVariants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    rotateY: 0,
  },
  animate: {
    pathLength: [1, 0.8, 1],
    opacity: [1, 0.8, 1],
    rotateY: [0, 180, 360],
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

const BadgeDollarSign = ({
  hovered = false,
  className = "",
  stroke = "#191a1a", // default dark stroke, will be white on hover
  width = 24,
  height = 24,
  strokeWidth = 2,
}) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start(hovered ? "animate" : "normal");
  }, [hovered]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={hovered ? "#ffffff" : stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <motion.path
        d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
        variants={badgeVariants}
        animate={controls}
        initial="normal"
      />
      <motion.g variants={dollarVariants} animate={controls} initial="normal">
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
        <path d="M12 18V6" />
      </motion.g>
    </svg>
  );
};

export { BadgeDollarSign };
