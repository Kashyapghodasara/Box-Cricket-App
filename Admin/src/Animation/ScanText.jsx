"use client";

import { motion, useAnimation } from "motion/react";
import { useEffect } from "react";

const frameVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 1 },
};

const lineVariants = {
  visible: { pathLength: 1, opacity: 1 },
  hidden: { pathLength: 0, opacity: 0 },
};

const ScanText = ({
  width = 26,
  height = 26,
  strokeWidth = 2,
  hovered = false,
  ...props
}) => {
  const controls = useAnimation();

  useEffect(() => {
    const animateLines = async () => {
      if (hovered) {
        await controls.start((i) => ({
          pathLength: 0,
          opacity: 0,
          transition: { delay: i * 0.1, duration: 0.3 },
        }));
        await controls.start((i) => ({
          pathLength: 1,
          opacity: 1,
          transition: { delay: i * 0.1, duration: 0.3 },
        }));
      } else {
        controls.start("visible");
      }
    };

    animateLines();
  }, [hovered, controls]);

  const dynamicStroke = hovered ? "#ffffff" : "#000000";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={dynamicStroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <motion.path variants={frameVariants} d="M3 7V5a2 2 0 0 1 2-2h2" />
      <motion.path variants={frameVariants} d="M17 3h2a2 2 0 0 1 2 2v2" />
      <motion.path variants={frameVariants} d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <motion.path variants={frameVariants} d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <motion.path
        variants={lineVariants}
        initial="visible"
        animate={controls}
        custom={0}
        d="M7 8h8"
      />
      <motion.path
        variants={lineVariants}
        initial="visible"
        animate={controls}
        custom={1}
        d="M7 12h10"
      />
      <motion.path
        variants={lineVariants}
        initial="visible"
        animate={controls}
        custom={2}
        d="M7 16h6"
      />
    </svg>
  );
};

export { ScanText };
