import Transaction from "./transactions";

class TransactionPool {

    transactions: Transaction[]

    constructor() {
        this.transactions = []

    }


    updateOrAddTransaction(transaction: Transaction) {

        let transactionWithId: Transaction | undefined = this.transactions.find(tr => tr.id === transaction.id)

        if (transactionWithId) { //update
            this.transactions[this.transactions.indexOf(transactionWithId)] = transaction
        } else { //add
            this.transactions.push(transaction)
        }
    }


    existingTransaction(address: string): any {
        return this.transactions.find(tr => tr.input.address === address)
    }
}

export default TransactionPool