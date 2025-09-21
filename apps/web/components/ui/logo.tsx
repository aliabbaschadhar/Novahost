"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  variant?: "default" | "white" | "dark";
  priority?: boolean;
  animate?: boolean;
}

export function Logo({
  width = 40,
  height = 40,
  className = "",
  variant = "default",
  priority = false,
  animate = false,
}: LogoProps) {
  const getLogoSrc = () => {
    switch (variant) {
      case "white":
        return "/logo-white.svg";
      case "dark":
        return "/logo-dark.svg";
      default:
        return "/logo.svg";
    }
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        animate && "transition-transform duration-300 hover:scale-105",
        className,
      )}
    >
      <Image
        src={getLogoSrc()}
        alt="NovaHost Logo"
        width={width}
        height={height}
        priority={priority}
        className={cn(
          "object-contain",
          animate && "transition-all duration-300",
        )}
      />
    </div>
  );
}

// Alternative inline SVG version for better control and animations
export function LogoInline({
  width = 40,
  height = 40,
  className = "",
  variant = "default",
  animate = true,
}: Omit<LogoProps, "priority">) {
  const colors = {
    default: {
      sphere: "url(#sphereGradient)",
      ring: "url(#ringGradient)",
      outer: "url(#outerGradient)",
      text: "#FFFFFF",
    },
    white: {
      sphere: "#FFFFFF",
      ring: "#FFFFFF",
      outer: "#FFFFFF",
      text: "#000000",
    },
    dark: {
      sphere: "#1E293B",
      ring: "#8B5CF6",
      outer: "#1E293B",
      text: "#FFFFFF",
    },
  };

  const currentColors = colors[variant];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        animate && "transition-transform duration-300 hover:scale-105",
        className,
      )}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={animate ? "transition-all duration-300" : ""}
      >
        {/* Outer ring */}
        <circle
          cx="60"
          cy="60"
          r="56"
          stroke={currentColors.outer}
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />

        {/* Inner orbital ring */}
        <ellipse
          cx="60"
          cy="60"
          rx="42"
          ry="22"
          stroke={currentColors.ring}
          strokeWidth="1.5"
          fill="none"
          opacity="0.8"
          transform="rotate(-25 60 60)"
        />

        {/* Main sphere */}
        <circle
          cx="60"
          cy="60"
          r="32"
          fill={currentColors.sphere}
          stroke={currentColors.ring}
          strokeWidth="1"
        />

        {/* Orbital dots */}
        {animate && (
          <>
            <circle
              cx="28"
              cy="60"
              r="2.5"
              fill={currentColors.text}
              opacity="0.9"
            >
              <animate
                attributeName="opacity"
                values="0.5;1;0.5"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx="92"
              cy="60"
              r="2"
              fill={currentColors.text}
              opacity="0.7"
            >
              <animate
                attributeName="opacity"
                values="0.3;0.8;0.3"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx="60"
              cy="28"
              r="2.5"
              fill={currentColors.text}
              opacity="0.8"
            >
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx="60"
              cy="92"
              r="2"
              fill={currentColors.text}
              opacity="0.6"
            >
              <animate
                attributeName="opacity"
                values="0.4;0.9;0.4"
                dur="3.5s"
                repeatCount="indefinite"
              />
            </circle>
          </>
        )}

        {!animate && (
          <>
            <circle
              cx="28"
              cy="60"
              r="2.5"
              fill={currentColors.text}
              opacity="0.9"
            />
            <circle
              cx="92"
              cy="60"
              r="2"
              fill={currentColors.text}
              opacity="0.7"
            />
            <circle
              cx="60"
              cy="28"
              r="2.5"
              fill={currentColors.text}
              opacity="0.8"
            />
            <circle
              cx="60"
              cy="92"
              r="2"
              fill={currentColors.text}
              opacity="0.6"
            />
          </>
        )}

        {/* Letter N */}
        <path
          d="M47 43 L47 77 L52 77 L52 53 L68 77 L73 77 L73 43 L68 43 L68 67 L52 43 L47 43 Z"
          fill={currentColors.text}
          fontWeight="bold"
        />

        {/* Gradients for default variant */}
        {variant === "default" && (
          <defs>
            <radialGradient id="sphereGradient" cx="0.35" cy="0.35" r="0.8">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="30%" stopColor="#3B82F6" />
              <stop offset="70%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1E40AF" />
            </radialGradient>

            <linearGradient
              id="outerGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>

            <linearGradient
              id="ringGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="50%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        )}
      </svg>
    </div>
  );
}

// Logo with text variant
export function LogoWithText({
  width = 40,
  height = 40,
  className = "",
  variant = "default",
  textSize = "text-xl",
  animate = true,
}: LogoProps & { textSize?: string }) {
  const textColors = {
    default: "text-white",
    white: "text-white",
    dark: "text-gray-900",
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Logo width={width} height={height} variant={variant} animate={animate} />
      <span
        className={cn(
          "font-bold",
          textSize,
          textColors[variant],
          animate && "transition-colors duration-300",
        )}
      >
        NovaHost
      </span>
    </div>
  );
}
