"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useVelocity,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  className,
}: {
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    // Set the SVG height to match viewport height
    const updateHeight = () => {
      setSvgHeight(window.innerHeight);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight * 4]),
    {
      stiffness: 200,
      damping: 40,
    },
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight * 4 - 100]),
    {
      stiffness: 200,
      damping: 40,
    },
  );

  return (
    <motion.div
      className={cn("fixed top-0 left-4 h-full w-48 pointer-events-none z-40", className)}
    >
      <div className="relative top-20">
        <motion.div
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? "none"
                : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          className="border-netural-200 ml-8 flex h-8 w-8 items-center justify-center rounded-full border shadow-sm"
        >
          <motion.div
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
            animate={{
              backgroundColor: scrollYProgress.get() > 0 ? "white" : "#10b981",
              borderColor: scrollYProgress.get() > 0 ? "white" : "#059669",
            }}
            className="h-4 w-4 rounded-full border border-neutral-300 bg-white"
          />
        </motion.div>
        <svg
          viewBox={`0 0 80 ${svgHeight * 4}`}
          width="80"
          height={svgHeight * 4}
          className="ml-4 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 16 0V -36 l 16 24 V ${svgHeight * 3.2} l -16 24V ${svgHeight * 4}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
            strokeWidth="4"
            transition={{
              duration: 2,
            }}
          ></motion.path>
          <motion.path
            d={`M 16 0V -36 l 16 24 V ${svgHeight * 3.2} l -16 24V ${svgHeight * 4}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="6"
            className="motion-reduce:hidden"
            transition={{
              duration: 2,
            }}
          ></motion.path>
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#10b981" stopOpacity="0"></stop>
              <stop stopColor="#10b981"></stop>
              <stop offset="0.325" stopColor="#3b82f6"></stop>
              <stop offset="1" stopColor="#06b6d4" stopOpacity="0"></stop>
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
    </motion.div>
  );
};
