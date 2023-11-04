import * as React from "react"

interface JamIconProps {
  className?: string
}

export function JamIcon({ className }: JamIconProps) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <style>
          {
            ".cls-1{fill:none;stroke:#020202;stroke-miterlimit:10;stroke-width:1.91px}"
          }
        </style>
      </defs>
      <rect
        className="cls-1"
        x={6.27}
        y={1.5}
        width={11.45}
        height={3.82}
        rx={1.91}
      />
      <path
        className="cls-1"
        d="M5.32 9.61c1.11 0 1.11-.95 2.23-.95s1.11.95 2.23.95 1.11-.95 2.23-.95 1.11.95 2.22.95 1.12-.95 2.23-.95 1.11.95 2.22.95l1-.47-2.91-3.82H7.23L4.36 9.14z"
      />
      <path
        className="cls-1"
        d="M18.68 9.14v10.5a2.86 2.86 0 01-2.86 2.86H8.18a2.86 2.86 0 01-2.86-2.86V9.14"
      />
      <path
        className="cls-1"
        d="M13.91 15.82c0 1.05-.86 2.86-1.91 2.86s-1.91-1.81-1.91-2.86a1.91 1.91 0 013.82 0z"
      />
      <path className="cls-1" d="M12 12L12 13.91" />
    </svg>
  )
}
