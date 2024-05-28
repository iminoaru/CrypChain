import TransactionPool from "./transactionPool";
import Transaction from "./transactions";

var EC = require('elliptic').ec;
var ec = new EC('secp256k1');



class Wallet {

    balance: number
    keyPair: any
    publicKey: string


    constructor () {
        this.balance = 500
        this.keyPair = ec.genKeyPair()
        this.publicKey = this.keyPair.getPublic().encode('hex')
    }

    print() {
        return `Wallet -
                publicKey : ${this.publicKey.toString()}
                balance   : ${this.balance}`
    }

    sign(data: any) {
        return this.keyPair.sign(data)
    }

    createTransaction(recipient: string, amount: number, transactionPool: TransactionPool): any {
        if(amount > this.balance) {
            console.log(`Amount: ${amount} exceeds balance.`)
            return
        }

        let transaction = transactionPool.existingTransaction(this.publicKey)

        if(transaction) { //update
            transaction.update(this, recipient, amount)
        } else { //create
            transaction = Transaction.newTransaction(this, recipient, amount)
            transactionPool.updateOrAddTransaction(transaction)
        }

        return transaction
    }
}

export default Wallet