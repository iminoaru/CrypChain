import TransactionPool from "./transactionPool";
import Transaction from "./transactions";
import Blockchain from "../blockchain/blockchain";

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

    createTransaction(recipient: string, amount: number,  blockchain: Blockchain, transactionPool: TransactionPool): any {

        this.balance = this.calculateBalance(blockchain)

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

    static blockchainWallet() {
        const blockchainWallet = new this()
        blockchainWallet.publicKey = 'Blockchain-Wallet'

        return blockchainWallet
    }

    calculateBalance(blockchain: Blockchain) {

        let balance = this.balance
        let transactions: Transaction[] = []

        blockchain.chain.forEach(block => {
            if (Array.isArray(block.data)) {
                block.data.forEach((tr: Transaction) => {
                    transactions.push(tr)
                })
            }
        })

        const walletInputTs = transactions.filter(transaction => transaction.input.address === this.publicKey)

        let startTime = 0

        if(walletInputTs.length > 0) {
            const recentInputT = walletInputTs.reduce((prev, current) =>
                prev.input.timestamp > current.input.timestamp ? prev : current)

            balance = recentInputT.outputs.find(output => output.address === this.publicKey).amount
            startTime = recentInputT.input.timestamp
        }

        transactions.forEach(transaction => {
            if(transaction.input.timestamp > startTime) {
                transaction.outputs.find(output => {
                    if(output.address === this.publicKey) {
                        balance += output.amount
                    }
                })
            }
        })

        return balance
    }
}

export default Wallet