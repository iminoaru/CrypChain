import Block from './block';

class Blockchain {
    public chain: Block[]


    constructor() {
        this.chain = [Block.genesisBlock()] // first block of blockchain

    }


    addBlock(data: any): Block {
        const lastBlock: Block = this.chain[this.chain.length - 1]

        const newBlock: Block = Block.mineBlock(lastBlock, data)
        this.chain.push(newBlock)

        return newBlock
    }


    isValidBlockchain(chain: Block[]): boolean {
        if((JSON.stringify(chain[0])) !== (JSON.stringify(Block.genesisBlock())) ) return false // If first block is not the genesis block

        for(let i = 1 ; i < chain.length ; i++){
            let currBlock = chain[i]
            let prevBlock = chain[i-1]

            let generatedHash = Block.generateHash(prevBlock, currBlock.data, currBlock.nonce, currBlock.difficulty, currBlock.timestamp);

            if(currBlock.lastHash !== prevBlock.hash || currBlock.hash !== generatedHash) {
                console.log(`Block ${i} hash mismatch:`);
                console.log(`Current hash: ${currBlock.hash}`);
                console.log(`Generated hash: ${generatedHash}`);
                return false;
            }
        }

        return true;
    }


    replaceChain(newChain: Block[]) {
        if(newChain.length <= this.chain.length) {
            console.log('Received chain is not longer than the current chain')
            return
        }

        if (!this.isValidBlockchain(newChain)) {
            console.log('Received chain is not valid')
            return
        } else {
            this.chain = newChain
            console.log('Chain replaced')
        }
    }
}

export default Blockchain