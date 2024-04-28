import express from 'express';
import bodyParser from "body-parser";

import blockchain from "../blockchain/blockchain";
import P2P from "./peerToPeer";

const app = express();
const PORT = process.env.PORT || 3210;

app.use(bodyParser.json())

const bc: blockchain = new blockchain();
const p2pServer: P2P = new P2P(bc)

app.get('/blockchain' , (req , res) => {
    res.json(bc.chain)
})

app.post('/blockchain/mine' , (req , res) => {
    const block: any = req.body.data

    if(!block) {
        res.status(400).send('Block not found')
        return

    }

    bc.addBlock(block)

    p2pServer.syncChain()

    res.redirect('/blockchain')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

p2pServer.listen()