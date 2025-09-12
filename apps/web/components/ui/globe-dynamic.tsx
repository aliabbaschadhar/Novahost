"use client";
import dynamic from "next/dynamic";
import { GlobeConfig } from "./globe";

// Define the types for our component props
export type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

// Dynamically import the World component with no SSR
const World = dynamic(
  () => import("./globe").then((mod) => ({ default: mod.World })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-80 w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
      </div>
    ),
  },
);

export { World };
export type { WorldProps, GlobeConfig };
