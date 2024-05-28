import { v1 as uuidV1 } from 'uuid';
import { sha256 } from 'js-sha256';
var EC = require('elliptic').ec;
var ec = new EC('secp256k1');

const MINING_REWARD = 20

class Transaction {

    id: string
    input: any
    outputs: any[]

    constructor() {
        this.id = uuidV1();
        this.input = null;
        this.outputs = [];
    }

    update(senderWallet: any, recipient: string, amount: number): any {
        const senderOutput = this.outputs.find(output => output.address === senderWallet.publicKey);

        if (amount > senderOutput.amount) {
            console.log(`Amount: ${amount} exceeds balance. (update)`);
            return;
        }

        senderOutput.amount = senderOutput.amount - amount;
        this.outputs.push({ amount, address: recipient });
        Transaction.signTransaction(this, senderWallet);

        return this;
    }

    static transactionWithOutputs(senderWallet: any, outputs: any[]): any {

        const transaction = new this();
        transaction.outputs.push(...outputs);
        Transaction.signTransaction(transaction, senderWallet);
        return transaction;

    }

    static newTransaction(senderWallet: any, recipient: string, amount: number): any {
        if (amount > senderWallet.balance) {
            console.log(`Amount: ${amount} exceeds balance. (newTransaction)`);
            return;
        }

        const transaction = new this();

        transaction.outputs.push(...[
            { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
            { amount, address: recipient }
        ]);

        Transaction.signTransaction(transaction, senderWallet)

        return Transaction.transactionWithOutputs(senderWallet, transaction.outputs);

    }

    static rewardTransaction(minerWallet: any, blockchainWallet: any): any { // blockchainWallet will approve (sign) the transaction, not the miner
        return Transaction.transactionWithOutputs(blockchainWallet, [{
            amount: MINING_REWARD, address: minerWallet.publicKey
        }]);

    }

    static signTransaction(transaction: Transaction, senderWallet: any) {
        transaction.input = {
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(sha256(transaction.outputs))

        }
    }

    static verifySignature(publicKey: string, signature: any, dataHash: any) {
        return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature)
    }

    // static verifyTransaction(transaction: Transaction) {
    //     return this.verifySignature(transaction.input.address, transaction.input.signature, sha256(transaction.outputs))
    // }

    static verifyTransaction(transaction: Transaction) {
        const outputTotal = transaction.outputs.reduce((total, output) => total + output.amount, 0);

        if (transaction.input.amount !== outputTotal) {
            console.log(`Invalid transaction from ${transaction.input.address}.`);
            return false;
        }

        if (!Transaction.verifySignature(
            transaction.input.address,
            transaction.input.signature,
            sha256(transaction.outputs)
        )) {
            console.log(`Invalid signature from ${transaction.input.address}.`);
            return false;
        }

        return true;
    }
}

export default Transaction