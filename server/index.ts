import express from 'express';
import bodyParser from "body-parser";

import blockchain from "../blockchain/blockchain";
import P2P from "./peerToPeer";

import TransactionPool from "../wallet/transactionPool";
import Wallet from "../wallet/index";

import Miner from "./miner";

const app = express();
const PORT = process.env.PORT || 3100

app.use(bodyParser.json())

const bc: blockchain = new blockchain();
const wallet: Wallet = new Wallet();
const tp: TransactionPool = new TransactionPool();

const p2pServer: P2P = new P2P(bc, tp)

const miner: Miner = new Miner(bc, tp, wallet, p2pServer)


app.get('/blockchain' , (req , res) => {
    res.json(bc.chain)
})

app.post('/mine' , (req , res) => {
    const block: any = req.body.data

    if(!block) {
        res.status(400).send('Block not found')
        return

    }

    bc.addBlock(block)

    p2pServer.syncChain()

    res.redirect('/blockchain')
})

app.get('/transactions' , (req , res) => {
    res.json(tp.transactions)
})

app.post('/transfer' , (req , res) => {

    const { recipient , amount } = req.body
    const transaction = wallet.createTransaction(recipient , amount , bc, tp)

    p2pServer.broadcastTransaction(transaction) //broadcasted across the network

    res.redirect('/transactions')
})

app.get('/public-key' , (req , res) => {
    res.json({ publicKey: wallet.publicKey })
})

app.get('/mine-transactions' , (req , res) => {
    const block = miner.mine()

    console.log(`New block added (mined): ${block.toString()}`)

    res.redirect('/blockchain')

})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

p2pServer.listen()