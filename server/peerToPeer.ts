import  WebSocket  from 'ws'
import blockchain from "../blockchain/blockchain";
import TransactionPool from "../wallet/transactionPool";
import Transaction from "../wallet/transactions";

const p2pPORT = Number(process.env.p2pPORT) || 5001

// ws://localhost:5001,ws://localhost:5002
const peers: string[] = process.env.PEERS ? process.env.PEERS.split(',') : []

const SMS_TYPES = {
    chain: 'CHAIN',
    transaction: 'TRANSACTION'
}

class P2P {

    public blockchain: blockchain
    public transactionPool: TransactionPool
    public sockets: WebSocket[]

    constructor(blockchain: blockchain , transactionPool: TransactionPool) {
        this.blockchain = blockchain
        this.transactionPool = transactionPool
        this.sockets = []
    }


    listen() {
        const server = new WebSocket.Server({ port: p2pPORT })
        server.on('connection', (socket) => this.connectSocket(socket))
        this.connectToPeers()

        console.log(`P2P Server is running on port ${p2pPORT}`)

    }

    connectSocket(socket: WebSocket) {
        this.sockets.push(socket)
        console.log('Socket connected')

        this.handleMessages(socket)

        socket.send(JSON.stringify(this.blockchain.chain))
    }


    connectToPeers() {
        peers.forEach( p => {
            const socket = new WebSocket(p)

            socket.on('open', () => this.connectSocket(socket))
        })
    }

    handleMessages(socket: WebSocket) {
        socket.on('message' , sms => {
            const data = JSON.parse(sms.toString())

            if(data.type == SMS_TYPES.chain) {
                this.blockchain.replaceChain(data.chain)
            }

            else if(data.type == SMS_TYPES.transaction) {
                this.transactionPool.updateOrAddTransaction(data.transaction)
            }


        })
    }

    syncChain() {
        this.sockets.forEach(socket => {
            socket.send(JSON.stringify(this.blockchain.chain))

        })
    }

    sendChain(socket: WebSocket) {
        socket.send(JSON.stringify(
            {type: SMS_TYPES.chain,
                chain: this.blockchain.chain}))
    }

    sendTransaction(socket: WebSocket , transaction: Transaction) {
        socket.send(JSON.stringify(
            {type: SMS_TYPES.transaction,
                transaction: transaction}))
    }

    broadcastTransaction(transaction: Transaction) {

        this.sockets.forEach(socket => {
            this.sendTransaction(socket , transaction)
        })
    }
}

export default P2P

// 1 -> npm run dev (starts first server)
// 2 -> PORT=3100 p2pPORT=5002 PEERS=ws://localhost:5001 npm run dev (starts second server)