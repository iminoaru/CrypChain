import Transaction from './transactions';
import Wallet from './index';

const MINING_REWARD = 20

describe('Transaction', () => {
    let transaction: Transaction;
    let wallet: Wallet;
    let amount: number;
    let recipient: string;

    beforeEach(() => {
        wallet = new Wallet();
        amount = 20;
        recipient = 'some random person';

        const newTransaction = Transaction.newTransaction(wallet, recipient, amount);
        if (!newTransaction) {
            throw new Error('Transaction creation failed');
        }
        transaction = newTransaction;
    });

    it('ouputs the `amount` subtracted from the wallet balance', () => {
        expect(transaction.outputs.find((output) => output.address === wallet.publicKey).amount)
            .toEqual(wallet.balance - amount);
    });

    it('outputs the `amount` added to the recipient', () => {
        expect(transaction.outputs.find((output) => output.address === recipient).amount)
            .toEqual(amount);
    });

    describe('transacting with an amount that exceeds the balance', () => {
            beforeEach(() => {
                amount = 50000;
            });

            it('does not create the transaction', () => {
                expect(() => {
                    const newTransaction = Transaction.newTransaction(wallet, recipient, amount);
                    if (!newTransaction) {
                        throw new Error('Transaction creation failed');
                    }
                    transaction = newTransaction;
                }).toThrow('Transaction creation failed');
            });

            it('inputs the balance of the wallet', () => {
                expect(transaction.input.amount).toEqual(wallet.balance);
            });

            it('validates a valid transaction', () => {
                expect(Transaction.verifyTransaction(transaction)).toBe(true);
            });
    
            it('invalidates a corrupt transaction', () => {
                transaction.outputs[0].amount = 100000;
                expect(Transaction.verifyTransaction(transaction)).toBe(false);
            });

        describe('and updating the transaction', () => {
            let nextAmount: number, nextRecipient: string;

            beforeEach(() => {
                nextAmount = 20;
                nextRecipient = 'next-persons-address'
                transaction = transaction.update(wallet, nextRecipient, nextAmount);

            });

            // it('outputs an increased amount subtracted from the sender', () => {
            //
            //     expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
            //         .toEqual(wallet.balance - amount - nextAmount);
            // });

            it('outputs an amount for the next recipient', () => {

                expect(transaction.outputs.find(output => output.address === nextRecipient).amount)
                    .toEqual(nextAmount);
            });
        });
    });

    describe('creating a reward transaction', () => {
        beforeEach(() => {
            transaction = Transaction.rewardTransaction(wallet, Wallet.blockchainWallet());
        });

        it(`reward the miner's wallet`, () => {
            expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
                .toEqual(MINING_REWARD);
        });

    });
});