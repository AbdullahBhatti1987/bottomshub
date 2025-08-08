import { useState } from "react";

export default function Tooltip({ children, text, position = "top" }) {
  const [visible, setVisible] = useState(false);

  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const tooltipPosition = positions[position] || positions.top;

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={`absolute z-50 whitespace-nowrap bg-black text-white text-xs rounded px-2 py-1 ${tooltipPosition}`}
        >
          {text}
        </div>
      )}
    </div>
  );
}
