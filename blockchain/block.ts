import { sha256 } from 'js-sha256';

// difficulty for PoW
const DIFF = 3 // Default difficulty
const MINE_TIME = 1000 // 5 seconds

class Block {

    public timestamp : number
    public lastHash : string
    public hash : string
    public data : any
    public nonce : number
    public difficulty : number

    constructor(timestamp: number, lastHash: string, hash: string, data: any, nonce: number, difficulty: number) {
        this.timestamp = timestamp
        this.lastHash = lastHash
        this.hash = hash
        this.data = data
        this.nonce = nonce
        this.difficulty = difficulty || DIFF
    }


    print() : void {
        console.log(`-BLOCK-
                    timestamp: ${this.timestamp}
                    lastHash: ${this.lastHash}
                    hash: ${this.hash}
                    data: ${this.data}
                    nonce: ${this.nonce}
                    difficulty: ${this.difficulty}`)
    }

    static generateHash(lastBlock: Block, data: any, nonce: number , difficulty: number , timestamp: number = Date.now()): string {
        return sha256(lastBlock.hash + data + timestamp + nonce + difficulty)
    }

    // first block of the blockchain
    static genesisBlock() : Block {
        return new this(672004, '-none-', 'firstHashOfBC', "", 0 , DIFF) // data for first block
    }


    static mineBlock(lastBlock: Block, data: any) : Block {
        let timestamp , hash
        let nonce = 0
        let difficulty = lastBlock.difficulty


        // find the hash that have the no. of zeros = DIFF, this is the PoW (Hashcash)
        do {
            nonce++
            timestamp = Date.now()
            difficulty = Block.adjustDifficulty(lastBlock, timestamp)
            hash = Block.generateHash(lastBlock, data, nonce, timestamp)
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty))

        return new this(timestamp, lastBlock.hash, hash, data ,nonce, difficulty)
    }


    static adjustDifficulty(lastBlock: Block, currentTime: number): number {

        let difficulty = lastBlock.difficulty

        if (lastBlock.timestamp + MINE_TIME > currentTime) {
            return difficulty + 1
        } else {
            return difficulty - 1
        }
    }

}


export default Block