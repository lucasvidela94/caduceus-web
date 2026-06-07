import type { ComponentProps } from "react";

/**
 * Caduceus icon — replaces GraduationCap as the app logo.
 * Public domain SVG from Wikimedia Commons, adapted to stroke style.
 * License: CC0 / Public Domain — free for commercial use.
 */
export function CaduceusIcon({
  className,
  size = 24,
  ...props
}: ComponentProps<"svg"> & { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Staff */}
      <line x1="12" y1="2.5" x2="12" y2="22" />
      {/* Left wing */}
      <path d="M5.5 5.5C3 6 2 8.5 3.5 10.5S7 12 8 11" />
      {/* Right wing */}
      <path d="M18.5 5.5C21 6 22 8.5 20.5 10.5S17 12 16 11" />
      {/* Left snake winding up */}
      <path d="M8.5 8c-1.5 2-3 5.5-1 8.5" />
      <path d="M7.5 16.5c1.5 1.5 4 1 5-.5" />
      {/* Right snake winding down */}
      <path d="M15.5 8c1.5 2 3 5.5 1 8.5" />
      <path d="M16.5 16.5c-1.5 1.5-4 1-5-.5" />
    </svg>
  );
}
