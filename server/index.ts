import express from 'express';

import blockchain from "../blockchain/blockchain";

const app = express();
const PORT = process.env.PORT || 3210;

const bc = new blockchain();

app.get('/blockchain' , (req , res) => {
    res.json(bc.chain)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})