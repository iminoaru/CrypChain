
var EC = require('elliptic').ec;
var ec = new EC('secp256k1');



class Wallet {

    balance: number
    keyPair: any
    publicKey: string


    constructor () {
        this.balance = 100
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
}

export default Wallet