import React from 'react';

export interface Connection {
  from: number;
  to: number;
}

interface ChainConnectorProps {
  from: number;
  to: number;
  positions: { [id: number]: { input: { x: number; y: number }; output: { x: number; y: number } } };
}

const ChainConnector: React.FC<ChainConnectorProps> = ({ from, to, positions }) => {
  let fromPos, toPos;

  if (from === 0) {
    fromPos = { x: 100, y: 100 }; // Adjust these values to match the position of the initial input
  } else {
    fromPos = positions[from]?.output;
  }

  if (to === -1) {
    toPos = { x: 200, y: 200 }; // Adjust these values to match the position of the final output
  } else {
    toPos = positions[to]?.input;
  }

  if (!fromPos || !toPos) return null;

  const startX = fromPos.x;
  const startY = fromPos.y;
  const endX = toPos.x;
  const endY = toPos.y;

  return (
    <svg
      className="absolute pointer-events-none"
      style={{ top: 0, left: 0, position: "absolute" }}
      width="100%"
      height="100%"
    >
      <path
        d={`M ${startX} ${startY} C ${(startX + endX) / 2} ${startY}, ${(startX + endX) / 2} ${endY}, ${endX} ${endY}`}
        stroke="blue"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
};

export const ConnectorLines: React.FC<{ connections: Connection[]; positions: { [id: number]: { input: { x: number; y: number }; output: { x: number; y: number } } } }> = ({
  connections,
  positions,
}) => {
  return (
    <>
      {connections.map(({ from, to }, index) => (
        <ChainConnector key={index} from={from} to={to} positions={positions} />
      ))}
    </>
  );
};

export default ChainConnector;