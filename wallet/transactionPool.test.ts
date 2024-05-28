import Transaction from './transactions';
import Wallet from './index';
//import Blockchain from './blockchain';
import TransactionPool from './transactionPool';


describe('TransactionPool', () => {
    let tp : TransactionPool, wallet : Wallet, transaction : Transaction;

    beforeEach(() => {
        tp = new TransactionPool();
        wallet = new Wallet();

        transaction = wallet.createTransaction('r4nd-4dr355', 30,  tp);

    });

    it('adds a transaction to the pool', () => {
        expect(tp.transactions.find((tr: { id: string }) => tr.id === transaction.id)).toEqual(transaction);
    });

    it('updates a transaction in the pool', () => {
        const oldTransaction = JSON.stringify(transaction);
        const newTransaction = transaction.update(wallet, 'foo-4ddr355', 40);
        tp.updateOrAddTransaction(newTransaction);

        expect(JSON.stringify(tp.transactions.find((tr: { id: string }) => tr.id === newTransaction.id)))
            .not.toEqual(oldTransaction);
    });


    describe('mixing valid and corrupt transactions', () => {
        let validTransactions : Transaction[];

        beforeEach(() => {
            validTransactions = [...tp.transactions];
            for (let i=0; i<6; i++) {
                wallet = new Wallet();
                transaction = wallet.createTransaction('r4nd-4dr355', 30, tp);
                if (i%2==0) {
                    transaction.input.amount = 9999;
                } else {
                    validTransactions.push(transaction);
                }
            }
        });

        it('grabs valid transactions', () => {
            expect(tp.validTransactions()).toEqual(validTransactions);
        });
    });

});
