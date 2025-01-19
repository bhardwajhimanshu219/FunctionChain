import React, { useState } from "react";
import FunctionCard from "./components/FunctionCard";

const App: React.FC = () => {
  const [initialValue, setInitialValue] = useState<number>(0);
  const [functions, setFunctions] = useState<string[]>(["x + 2", "x * 3", "x - 5", "x / 2", "x ^ 2"]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInitialValue(Number(event.target.value));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="flex items-center space-x-4 mb-6">
        <label htmlFor="initialValue" className="font-bold text-lg">
          Initial Value (x):
        </label>
        <input
          id="initialValue"
          type="number"
          value={initialValue}
          onChange={handleInputChange}
          className="border rounded-lg px-4 py-2 w-20 text-center"
        />
      </div>

      <div className="relative flex justify-center space-x-8 mb-8">
        {functions.map((func, index) => (
          <FunctionCard
            key={index}
            position={index + 1}
            equation={func}
            onUpdate={(updatedEquation) =>
              setFunctions((prev) => {
                const newFunctions = [...prev];
                newFunctions[index] = updatedEquation;
                return newFunctions;
              })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default App;
