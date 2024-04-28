import  WebSocket  from 'ws'
import blockchain from "../blockchain/blockchain";

const p2pPORT = Number(process.env.p2pPORT) || 5001

// ws://localhost:5001,ws://localhost:5002
const peers: string[] = process.env.PEERS ? process.env.PEERS.split(',') : []

class P2P {

    public blockchain: blockchain
    public sockets: WebSocket[]

    constructor(blockchain: blockchain) {
        this.blockchain = blockchain
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
    }


    connectToPeers() {
        peers.forEach( p => {
            const socket = new WebSocket(p)

            socket.on('open', () => this.connectSocket(socket))
        })
    }
}

export default P2P

// 1 -> npm run dev (starts first server)
// 2 -> PORT=3211 p2pPORT=5002 PEERS=ws://localhost:5001 npm run dev (starts second server)