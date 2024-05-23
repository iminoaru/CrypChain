import Block from './block';
const DIFF = 3


describe('Block', () => {
    describe('mineBlock', () => {
        it('mines a block where the hash starts with DIFF number of zeros', () => {
            const lastBlock = Block.genesisBlock();
            const data = 'test data';
            const newBlock = Block.mineBlock(lastBlock, data);

            expect(newBlock.hash.substring(0, newBlock.difficulty)).toEqual('0'.repeat(newBlock.difficulty));
        });

        it('increments the nonce until a valid hash is found', () => {
            const lastBlock = Block.genesisBlock();
            const data = 'test data';
            const newBlock = Block.mineBlock(lastBlock, data);

            expect(newBlock.nonce).toBeGreaterThan(0);
        });

        it('updates the timestamp for the new block', () => {
            const lastBlock = Block.genesisBlock();
            const data = 'test data';
            const newBlock = Block.mineBlock(lastBlock, data);

            expect(newBlock.timestamp).toBeGreaterThan(lastBlock.timestamp);
        });
    });
    describe('adjustDifficulty', () => {
        it('increases difficulty for quickly mined blocks', () => {
            const block = Block.mineBlock(Block.genesisBlock(), 'test data');
            block.timestamp = block.timestamp - 1000; // Simulate a block that was mined too quickly
            const fastBlock = Block.mineBlock(block, 'test data');

            expect(fastBlock.difficulty).toBeGreaterThan(block.difficulty);
        });

        it('decreases difficulty for slowly mined blocks', () => {
            const block = Block.mineBlock(Block.genesisBlock(), 'test data');
            block.timestamp = block.timestamp + 1000; // Simulate a block that was mined too slowly
            const slowBlock = Block.mineBlock(block, 'test data');

            expect(slowBlock.difficulty).toBeLessThan(block.difficulty);
        });
    });
});