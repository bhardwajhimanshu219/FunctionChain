import React, { useEffect, useRef } from "react";

interface FunctionCardProps {
  position: number;
  equation: string;
  nextFunctionId: number | null;
  onUpdate: (updatedEquation: string) => void;
  updatePosition: (id: number, inputPos: { x: number; y: number }, outputPos: { x: number; y: number }) => void;
}

export const FunctionCard = ({
  position,
  equation,
  onUpdate,
  nextFunctionId,
  updatePosition,
}: FunctionCardProps) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePositions = () => {
      if (inputRef.current && outputRef.current) {
        const inputRect = inputRef.current.getBoundingClientRect();
        const outputRect = outputRef.current.getBoundingClientRect();
        updatePosition(position, { x: inputRect.left + inputRect.width / 2, y: inputRect.top + inputRect.height / 2 }, { x: outputRect.left + outputRect.width / 2, y: outputRect.top + outputRect.height / 2 });
      }
    };

    updatePositions();

    // Update positions on window resize
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, [position, updatePosition]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEquation = event.target.value;
    // Allow only valid mathematical expressions
    const isValid = /^[x0-9+\-*/^() ]+$/.test(newEquation);

    if (isValid) {
      onUpdate(newEquation);
    } else {
      alert(
        "Invalid equation! Use only numbers, x, +, -, *, /, ^, and parentheses."
      );
    }
  };

  return (
    <div className="relative w-100 bg-white shadow-md border rounded-lg p-5 text-gray-700" id={`function-${position}`}>
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold text-lg">Function: {position}</span>
        <div className="w-4 h-4 bg-gray-300 rounded-full cursor-pointer"></div>
      </div>
      {/* Equation Input */}
      <div className="mb-4">
        <label
          htmlFor={`equation-${position}`}
          className="block text-sm font-medium mb-2"
        >
          Equation
        </label>
        <input
          id={`equation-${position}`}
          type="text"
          value={equation}
          onChange={handleChange}
          placeholder="Enter equation (e.g., x^2)"
          className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      {/* Next Function Dropdown */}
      <div className="mb-8">
        <label
          htmlFor={`next-function-${position}`}
          className="block text-sm font-medium mb-2"
        >
          Next function
        </label>
        <select
          id={`next-function-${position}`}
          disabled
          className="border rounded-lg px-3 py-2 w-full bg-gray-100 text-gray-500 cursor-not-allowed"
        >
          <option>Function: {nextFunctionId}</option>
        </select>
      </div>
      {/* Input and Output Markers */}
      <div ref={inputRef} className="absolute bottom-5 left-2 flex items-center space-x-2 text-sm" id={`input-${position}`}>
        <div className="flex items-center space-x-1">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          <span>input</span>
        </div>
      </div>
      <div ref={outputRef} className="absolute bottom-4 right-2 flex items-center space-x-2 text-sm" id={`output-${position}`}>
        <span>output</span>
        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
      </div>
    </div>
  );
};