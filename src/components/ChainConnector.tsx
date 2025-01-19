import React from "react";

export interface Connection {
  from: number;
  to: number;
}

export interface ChainConnectorProps {
  from: number;
  to: number;
  positions: { [id: number]: { x: number; y: number } }; // Map of positions for each function card
}

const ChainConnector: React.FC<ChainConnectorProps> = ({ from, to, positions }) => {
  if (!positions[from] || !positions[to]) return null; // Guard against invalid positions

  const { x: startX, y: startY } = positions[from];
  const { x: endX, y: endY } = positions[to];

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

export const ConnectorLines: React.FC<{ connections: Connection[]; positions: { [id: number]: { x: number; y: number } } }> = ({
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
