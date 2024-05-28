import Transaction from './transactions';
import Wallet from './index';
//import Blockchain from './blockchain';
import TransactionPool from './transactionPool';


describe('TransactionPool', () => {
    let tp : TransactionPool, wallet : Wallet, transaction : Transaction;

    beforeEach(() => {
        tp = new TransactionPool();
        wallet = new Wallet();
        transaction = Transaction.newTransaction(wallet , 'random-address', 30)
        tp.updateOrAddTransaction(transaction)
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

});
