import { sha256 } from 'js-sha256';

class Block {

    public timestamp : number
    public lastHash : string
    public hash : string
    public data : any


    constructor(timestamp: number, lastHash: string, hash: string, data: any, ) {
        this.timestamp = timestamp
        this.lastHash = lastHash
        this.hash = hash
        this.data = data

    }

    print() : void {
        console.log(`-BLOCK-
                    timestamp: ${this.timestamp}
                    lastHash: ${this.lastHash}
                    hash: ${this.hash}
                    data: ${this.data}`)
    }

    // first block of the blockchain
    static genesisBlock() : Block {
        return new this(672004, '-none-', 'firstHashOfBC', []) // data for first block
    }
}

export default Block