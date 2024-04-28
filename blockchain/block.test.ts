import Block from './block';
const DIFF = 3


describe('Block', () => {
    describe('mineBlock', () => {
        it('mines a block where the hash starts with DIFF number of zeros', () => {
            const lastBlock = Block.genesisBlock();
            const data = 'test data';
            const newBlock = Block.mineBlock(lastBlock, data);

            expect(newBlock.hash.substring(0, DIFF)).toEqual('0'.repeat(DIFF));
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
});