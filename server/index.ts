import express from 'express';
import bodyParser from "body-parser";
import blockchain from "../blockchain/blockchain";

const app = express();
const PORT = process.env.PORT || 3210;

app.use(bodyParser.json())

const bc: blockchain = new blockchain();

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

    res.redirect('/blockchain')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})