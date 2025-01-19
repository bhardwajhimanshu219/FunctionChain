import React, { useCallback, useEffect, useRef, useState } from "react";
import { FunctionCard } from "./components/FunctionCard";
import { ConnectorLines, Connection } from "./components/ChainConnector";

export interface FunctionNode {
  id: number;
  equation: string;
  nextFunctionId: number | null;
  input: number | null;
  output: number | null;
}

const App: React.FC = () => {
  const [functions, setFunctions] = useState<FunctionNode[]>([
    { id: 1, equation: "x+2", nextFunctionId: 2, input: null, output: null },
    { id: 2, equation: "2x+4", nextFunctionId: 4, input: null, output: null },
    { id: 3, equation: "x^2+20", nextFunctionId: null, input: null, output: null },
    { id: 4, equation: "x-2", nextFunctionId: 5, input: null, output: null },
    { id: 5, equation: "x/2", nextFunctionId: 3, input: null, output: null },
  ]);

  const [initialValue, setInitialValue] = useState<number>(2);
  const [finalOutput, setFinalOutput] = useState<number | null>(null);

  const positionsRef = useRef<{ [id: number]: { input: { x: number; y: number }; output: { x: number; y: number } } }>({});

  const calculateOutputs = useCallback(() => {
    const updatedFunctions = [...functions];
    let currentInput = initialValue;
    let currentFunctionId: number | null = 1;

    while (currentFunctionId !== null) {
      const func = updatedFunctions.find((f) => f.id === currentFunctionId);
      if (!func || currentInput === null) break;

      const x = currentInput;
      let equation = func.equation;

      equation = equation.replace(/(\d)(x)/g, "$1*$2");
      equation = equation.replace(/\^/g, "**");

      try {
        const funcEvaluator = new Function("x", `return ${equation}`);
        func.input = x;
        func.output = funcEvaluator(x);
        currentInput = func.output !== null ? func.output : currentInput;
        currentFunctionId = func.nextFunctionId;
      } catch (err) {
        console.error(`Error evaluating equation for Function ${func.id}: ${err}`);
        break;
      }
    }
    setFunctions(updatedFunctions);
    setFinalOutput(currentInput);
  }, [functions, initialValue]);

  useEffect(() => {
    calculateOutputs();
  }, [initialValue]);

  // Handle card positions dynamically
  const updatePosition = (id: number, inputPos: { x: number; y: number }, outputPos: { x: number; y: number }) => {
    positionsRef.current = { ...positionsRef.current, [id]: { input: inputPos, output: outputPos } };
  };

  // Create connections based on nextFunctionId
  const connections: Connection[] = functions
    .filter((f) => f.nextFunctionId !== null)
    .map((f) => ({ from: f.id, to: f.nextFunctionId! }));



  return (
    <div className="relative min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Function Chain</h1>

      <div className="flex justify-center items-center space-x-8">
        {/* Initial Value */}
        <div className="flex flex-col items-center">
          <span className="bg-orange-400 text-white px-3 py-1 rounded-full text-sm font-medium">
            Initial Value (x)
          </span>
          <input
            type="number"
            value={initialValue}
            onChange={(e) => setInitialValue(Number(e.target.value))}
            className="border px-3 py-1 rounded-lg text-center"
          />
        </div>

        {/* Function Cards */}
        <div className="relative grid grid-cols-3 gap-12">
          {functions.map((func, index) => (
            <div key={func.id}>
              <FunctionCard
                position={index + 1}
                equation={func.equation}
                nextFunctionId={func.nextFunctionId}
                onUpdate={(updatedEquation) =>
                  setFunctions((prev) => {
                    const newFunctions = [...prev];
                    newFunctions[index].equation = updatedEquation;
                    return newFunctions;
                  })
                }
                updatePosition={updatePosition}
              />
            </div>
          ))}
        </div>

        {/* Final Output */}
        <div className="flex flex-col items-center">
          <span className="bg-green-400 text-white px-3 py-1 rounded-full text-sm font-medium">
            Final Output (y)
          </span>
          <input
            type="number"
            value={finalOutput ?? 0}
            readOnly
            className="border px-3 py-1 rounded-lg text-center"
          />
        </div>
      </div>

      {/* Render Connectors */}
      <ConnectorLines connections={connections} positions={positionsRef.current} />
    </div>
  );
};

export default App;