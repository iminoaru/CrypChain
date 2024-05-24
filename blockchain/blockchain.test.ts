import Blockchain from './blockchain';
import Block from './block';

describe('Blockchain', () => {
    let blockchain: Blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
    });

    describe('addBlock', () => {
        it('adds a new block to the chain', () => {
            const data = 'test data';
            const newBlock = blockchain.addBlock(data);

            expect(blockchain.chain[blockchain.chain.length - 1]).toEqual(newBlock);
        });
    });

    describe('isValidBlockchain', () => {
        it('returns true for a valid chain', () => {
            blockchain.addBlock('block 1');

            expect(blockchain.isValidBlockchain(blockchain.chain)).toBe(true);
        });

        it('returns false if the chain does not start with the genesis block', () => {
            blockchain.chain[0] = Block.mineBlock(blockchain.chain[0], 'tampered genesis');

            expect(blockchain.isValidBlockchain(blockchain.chain)).toBe(false);
        });

        it('returns false if a block has been tampered with', () => {
            blockchain.addBlock('block 1'); // Adding a block
            const tamperedBlock = Block.mineBlock(blockchain.chain[1], 'tampered block data'); // Creating a tampered block
            tamperedBlock.data = 'modified data'; // Simulating tampering by modifying the block's data
            blockchain.chain[2] = tamperedBlock; // Assigning the tampered block to the chain

            expect(blockchain.isValidBlockchain(blockchain.chain)).toBe(false); // Checking the validity of the blockchain
        });


    });

    describe('replaceChain', () => {
        it('does not replace the chain if the new chain is shorter', () => {
            const newChain = [Block.genesisBlock(), Block.mineBlock(Block.genesisBlock(), 'block 1')];
            blockchain.addBlock('block 1');
            blockchain.addBlock('block 2');

            blockchain.replaceChain(newChain);

            expect(blockchain.chain.length).toBe(3);
        });

        it('does not replace the chain if the new chain is invalid', () => {
            const newChain = [Block.genesisBlock(), Block.mineBlock(Block.genesisBlock(), 'block 1')];
            newChain[1].hash = 'incorrect hash';

            blockchain.replaceChain(newChain);

            expect(blockchain.chain.length).toBe(1);
        });

        it('replaces the chain if the new chain is longer and valid', () => {
            const newChain = [Block.genesisBlock(), Block.mineBlock(Block.genesisBlock(), 'block 1')];
            newChain.push(Block.mineBlock(newChain[1], 'block 2'));
            newChain.push(Block.mineBlock(newChain[2], 'block 3'));
            newChain.push(Block.mineBlock(newChain[3], 'block 4'));
            blockchain.replaceChain(newChain);

            expect(blockchain.chain).toEqual(newChain);
        });

    })

});