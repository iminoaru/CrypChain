import Blockchain from "../blockchain/blockchain";
import TransactionPool from "../wallet/transactionPool";
import Wallet from "../wallet";
import P2P from "./peerToPeer";
import Transaction from "../wallet/transactions";
import Block from "../blockchain/block";


class Miner {

    public blockchain: Blockchain
    public transactionPool: TransactionPool
    public wallet: Wallet
    public p2pServer: P2P

    constructor(blockchain: Blockchain, transactionPool: TransactionPool, wallet: Wallet, p2pServer: P2P) {
        this.blockchain = blockchain
        this.transactionPool = transactionPool
        this.wallet = wallet
        this.p2pServer = p2pServer
    }

    mine(): Block {
        const validTransactions = this.transactionPool.validTransactions()
        validTransactions.push(Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet()))

        const block = this.blockchain.addBlock(validTransactions)

        this.p2pServer.syncChain()

        this.transactionPool.clear()

        this.p2pServer.broadcastClearTransactions()

        return block

    }
}

export default Miner