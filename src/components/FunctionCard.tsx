import React from "react";

interface FunctionCardProps {
  position: number;
  equation: string;
  onUpdate: (updatedEquation: string) => void;
}

const FunctionCard = ({ position, equation, onUpdate }:FunctionCardProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(event.target.value);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-40 text-center">
      <h3 className="font-bold text-lg mb-2">Position {position}</h3>
      <input
        type="text"
        value={equation}
        onChange={handleChange}
        className="border rounded-lg px-2 py-1 w-full text-center"
        placeholder="Enter equation"
      />
      <div className="text-sm text-gray-500 mt-2">Next Function: {position + 1}</div>
    </div>
  );
};

export default FunctionCard;
