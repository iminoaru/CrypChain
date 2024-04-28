import { sha256 } from 'js-sha256';

// difficulty for PoW
const DIFF = 3

class Block {

    public timestamp : number
    public lastHash : string
    public hash : string
    public data : any
    public nonce : number

    constructor(timestamp: number, lastHash: string, hash: string, data: any, nonce: number) {
        this.timestamp = timestamp
        this.lastHash = lastHash
        this.hash = hash
        this.data = data
        this.nonce = nonce
    }


    print() : void {
        console.log(`-BLOCK-
                    timestamp: ${this.timestamp}
                    lastHash: ${this.lastHash}
                    hash: ${this.hash}
                    data: ${this.data}
                    nonce: ${this.nonce}`)
    }

    static generateHash(lastBlock: Block, data: any, nonce: number , timestamp: number = Date.now()): string {
        return sha256(lastBlock.hash + data + timestamp + nonce)
    }

    // first block of the blockchain
    static genesisBlock() : Block {
        return new this(672004, '-none-', 'firstHashOfBC', "", 0) // data for first block
    }


    static mineBlock(lastBlock: Block, data: any) : Block {
        let timestamp , hash
        let nonce = 0


        // find the hash that have the no. of zeros = DIFF, this is the PoW (Hashcash)
        do {
            nonce++
            timestamp = Date.now()
            hash = Block.generateHash(lastBlock, data, nonce, timestamp)
        } while (hash.substring(0, DIFF) !== '0'.repeat(DIFF))

        return new this(timestamp, lastBlock.hash, hash, data ,nonce)
    }


}

export default Block