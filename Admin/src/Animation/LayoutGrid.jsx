import { motion } from "framer-motion";

const boxVariants = {
  normal: { x: 0, y: 0 },
  animate: (i) => {
    const positions = [
      { x: 11, y: 0 },
      { x: 0, y: 11 },
      { x: -11, y: 0 },
      { x: 0, y: -11 },
    ];
    return positions[i];
  },
};

export const LayoutGrid = ({ hovered, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke={hovered ? "#fff" : "#191a1a"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={i}
          width="7"
          height="7"
          x={i === 0 || i === 3 ? 3 : 14}
          y={i < 2 ? 3 : 14}
          rx="1"
          variants={boxVariants}
          animate={hovered ? "animate" : "normal"}
          custom={i}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        />
      ))}
    </svg>
  );
};
