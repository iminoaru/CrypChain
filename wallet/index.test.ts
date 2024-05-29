import Wallet from './index';
//import Blockchain from './blockchain';
import TransactionPool from './transactionPool';
import Transaction from "./transactions";
import Blockchain from "../blockchain/blockchain";

const INITIAL_BALANCE = 500;

describe('Wallet', () => {
    let wallet: Wallet, tp: TransactionPool , bc: Blockchain;

    beforeEach(() => {
        wallet = new Wallet();
        tp = new TransactionPool();
        bc = new Blockchain();
    });

    describe('creating a transaction', () => {
        let transaction: Transaction, sendAmount: number, recipient: string;

        beforeEach(() => {
            sendAmount = 50;
            recipient = 'some-random-guys-address';
            transaction = wallet.createTransaction(recipient, sendAmount, bc, tp);
        });

        describe('and doing the same transaction', () => {
            beforeEach(() => {
                wallet.createTransaction(recipient, sendAmount, bc, tp);
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

    describe('calculating a balance', () => {
        let addBalance: number, repeatAdd: number, senderWallet: Wallet;

        beforeEach(() => {
            senderWallet = new Wallet();
            addBalance = 100;
            repeatAdd = 3;
            for (let i=0; i<repeatAdd; i++) {
                senderWallet.createTransaction(wallet.publicKey, addBalance, bc, tp);
            }
            bc.addBlock(tp.transactions);
        });

        it('calculates the balance for blockchain transactions matching the recipient', () => {
            expect(wallet.calculateBalance(bc)).toEqual(INITIAL_BALANCE + (addBalance * repeatAdd));
        });

        it('calculates the balance for blockchain transactions matching the sender', () => {
            expect(senderWallet.calculateBalance(bc)).toEqual(INITIAL_BALANCE - (addBalance * repeatAdd));
        });

        describe('and the recipient conducts a transaction', () => {
            let subtractBalance: number, recipientBalance: number;

            beforeEach(() => {
                tp.clear();
                subtractBalance = 60;
                recipientBalance = wallet.calculateBalance(bc);
                wallet.createTransaction(senderWallet.publicKey, subtractBalance, bc, tp);
                bc.addBlock(tp.transactions);
            });

            describe('and the sender sends another transaction to the recipient', () => {
                beforeEach(() => {
                    tp.clear();
                    senderWallet.createTransaction(wallet.publicKey, addBalance, bc, tp);
                    bc.addBlock(tp.transactions);
                });

                it('calculate the recipient balance only using transactions since its most recent one', () => {
                    expect(wallet.calculateBalance(bc)).toEqual(recipientBalance - subtractBalance + addBalance);
                });
            });
        });
    })
});