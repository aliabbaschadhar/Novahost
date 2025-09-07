"use client";
import React, { useRef } from "react";
import { useScroll, useTransform } from "motion/react";
import { GoogleGeminiEffect } from "./google-gemini-effect";
import { cn } from "@/lib/utils";

export const GoogleGeminiDemo = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Create staggered path animations like in the demo
  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  const pathLengths = [
    pathLengthFirst,
    pathLengthSecond,
    pathLengthThird,
    pathLengthFourth,
    pathLengthFifth,
  ];

  return (
    <section
      ref={ref}
      className={cn("relative h-[300vh] w-full overflow-hidden", className)}
    >
      <GoogleGeminiEffect pathLengths={pathLengths} />
    </section>
  );
};