# CrypChain

CrypChain is a simple blockchain and cryptocurrency implementation written in TypeScript. It includes a basic proof-of-work consensus algorithm (hashcash), transaction system, mining and peer-to-peer network.

## Setup locally

### Prerequisites

- Node.js
- npm
- Typescript

### Installation

1. Clone the repository
```bash
git clone https://github.com/iminoaru/CrypChain.git
```

2. Navigate to the project directory
```bash
cd CrypChain
```

3. Install the dependencies
```bash
npm install
```

## Running the tests

To run the tests for the blockchain implementation, use the following command:

```bash
npm test
```

## Running the server

To start the server, use the following command:

```bash
npm run dev
```

## Running Multiple Instances

To simulate a network of nodes, you can run multiple instances of the application on different ports. Here's how you can do it:

1. Open a new terminal window for each instance you want to run.

2. Set the `HTTP_PORT` and `P2P_PORT` environment variables to different values for each instance. This will ensure that each instance runs on a different port.

3. Start each instance with the following command:

```bash
HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm start
```

In this command, `HTTP_PORT` is the port for the HTTP server, `P2P_PORT` is the port for the peer-to-peer server, and `PEERS` is a comma-separated list of the addresses of the peer nodes.

For example, if you want to run three instances, you can use the following commands:

```bash
# Terminal 1
HTTP_PORT=3001 P2P_PORT=5001 npm run dev

# Terminal 2
HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev

# Terminal 3
HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev
```

In this example, the first instance is not connected to any peers, the second instance is connected to the first instance, and the third instance is connected to the first and second instances. 
Peer to Peer creates a mesh topology of nodes.

## API Endpoints

- `GET /blockchain`: Returns the entire blockchain.
- `POST /mine`: Adds a new block to the blockchain. The data for the block is sent in the body of the request.
- `GET /transactions`: Returns all the transactions in the transaction pool.
- `POST /transfer`: Creates a new transaction. The recipient and amount are sent in the body of the request.
- `GET /public-key`: Returns the public key of the wallet.
- `GET /mine-transactions`: Mines all the transactions in the transaction pool to create a new block and adds it to the blockchain.

## How it works

CrypChain uses a proof-of-work consensus algorithm to secure the network. Each block in the chain includes a number of transactions. The `POST /transfer` endpoint is used to create a new transaction and add it to the transaction pool. The `GET /mine-transactions` endpoint is used to mine all the transactions in the transaction pool to create a new block and add it to the blockchain.

The CrypChain network is a peer-to-peer network where each node has a complete copy of the blockchain. When a new block is mined, it is broadcasted to all the nodes in the network.

## Tech used

- TypeScript
- Express
- Socket.IO
- Object Oriented Programming principles
