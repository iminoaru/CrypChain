import Wallet from './index';
//import Blockchain from './blockchain';
import TransactionPool from './transactionPool';
import Transaction from "./transactions";

const INITIAL_BALANCE = 500;

describe('Wallet', () => {
    let wallet: Wallet, tp: TransactionPool;

    beforeEach(() => {
        wallet = new Wallet();
        tp = new TransactionPool();
    });

    describe('creating a transaction', () => {
        let transaction: Transaction, sendAmount: number, recipient: string;

        beforeEach(() => {
            sendAmount = 50;
            recipient = 'some-random-guys-address';
            transaction = wallet.createTransaction(recipient, sendAmount, tp);
        });

        describe('and doing the same transaction', () => {
            beforeEach(() => {
                wallet.createTransaction(recipient, sendAmount, tp);
            });

            it('doubles the `sendAmount` subtracted from the wallet balance', () => {
                expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
                    .toEqual(wallet.balance - sendAmount*2); // transaction was alread performed twice before this test case thats why - sendAmount*2
            });

            it('clones the `sendAmount` output for the recipient', () => {
                expect(
                    transaction.outputs.filter(output => output.address === recipient)
                        .map(output => output.amount)
                ).toEqual([sendAmount, sendAmount]);
            });
        });
    });
});