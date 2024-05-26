import { v1 as uuidV1 } from 'uuid';

class Transactions {

    id: string
    input: any
    outputs: any[]

    constructor() {
        this.id = uuidV1();
        this.input = null;
        this.outputs = [];
    }

    static newTransaction(senderWallet: any, recipient: string, amount: number) {
        if (amount > senderWallet.balance) {
            console.log(`Amount: ${amount} exceeds balance.`);
            return;
        }

        const transaction = new this();

        transaction.outputs.push(...[
            { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
            { amount, address: recipient }
        ]);

        return transaction;
    }
}

export default Transactions