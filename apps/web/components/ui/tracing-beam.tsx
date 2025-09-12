"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useVelocity,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";
import { useIsDesktop } from "@/hooks/use-mobile";

export const TracingBeam = ({ className }: { className?: string }) => {
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 50,
    mass: 1,
  });
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    // Set the SVG height to match document height for full page coverage
    const updateHeight = () => {
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
      );
      setSvgHeight(documentHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    // Also update on content changes
    const observer = new MutationObserver(updateHeight);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("resize", updateHeight);
      observer.disconnect();
    };
  }, []);

  const y1 = useSpring(
    useTransform(smoothProgress, [0, 0.8], [50, svgHeight - 100]),
    {
      stiffness: 100,
      damping: 50,
      mass: 1,
    },
  );
  const y2 = useSpring(
    useTransform(smoothProgress, [0, 1], [50, svgHeight - 200]),
    {
      stiffness: 100,
      damping: 50,
      mass: 1,
    },
  );

  // Don't render on tablet and mobile devices
  if (!isDesktop) {
    return null;
  }

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-4 h-full w-48 pointer-events-none z-40",
        className,
      )}
    >
      <div className="relative top-20">
        <motion.div
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          animate={{
            boxShadow:
              smoothProgress.get() > 0
                ? "none"
                : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          className="border-netural-200 ml-8 flex h-8 w-8 items-center justify-center rounded-full border shadow-sm"
        >
          <motion.div
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            animate={{
              backgroundColor: smoothProgress.get() > 0 ? "white" : "#10b981",
              borderColor: smoothProgress.get() > 0 ? "white" : "#059669",
            }}
            className="h-4 w-4 rounded-full border border-neutral-300 bg-white"
          />
        </motion.div>
        <svg
          viewBox={`0 0 80 ${svgHeight}`}
          width="80"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 16 0V -36 l 16 24 V ${svgHeight * 0.8} l -16 24V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
            strokeWidth="4"
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
          ></motion.path>
          <motion.path
            d={`M 16 0V -36 l 16 24 V ${svgHeight * 0.8} l -16 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="6"
            className="motion-reduce:hidden"
            transition={{
              duration: 1,
              ease: "easeInOut",
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
