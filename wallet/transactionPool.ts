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

    validTransactions() {

        return this.transactions.filter(transaction => {
            const outputTotal = transaction.outputs.reduce((total, output) => {
                return output.amount + total
            }, 0)

            if (transaction.input.amount !== outputTotal) {
                console.log(`Invalid transaction from ${transaction.input.address} (input amount != output total` )
                return
            }

            if (!Transaction.verifyTransaction(transaction)) {
                console.log(`Invalid signature from ${transaction.input.address} (transaction not verified)`)
                return
            }

            return transaction
        })
    }

    clear() {
        this.transactions = []
    }

}

export default TransactionPool