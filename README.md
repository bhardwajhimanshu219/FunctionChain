# Function Chain Web Application

This web application allows users to execute a chain of mathematical functions, with the output (y) of each function serving as the input (x) for the next. The application visually represents the functions and their connections, making it easy to understand the flow of data through the function chain.

## Features

- Define a chain of mathematical functions.
- Automatically compute the output of each function based on the input from the previous function.
- Visual representation of the function chain with connectors.
- Adjustable initial input value.
- Display the final output value.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later) or yarn (v1.22 or later)

### Installation

1. Clone the repository:
git clone https://github.com/[username]/FunctionChain.git

### Running the Application
To start the development server, run:

npm install
# or
yarn install

### Project Structure

FunctionChain
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── FunctionCard.tsx
│   │   ├── ChainConnector.tsx
│   ├── App.tsx
│   ├── index.tsx
│   └── styles
│       └── App.css
├── package.json
├── tsconfig.json
└── README.md

### Usage

1. Adjust the initial input value using the input box labeled "Initial Value (x)".
2. Define the equations for each function in the chain.
3. The application will automatically compute the outputs and update the connections.
4. The final output value is displayed in the input box labeled "Final Output (y)".