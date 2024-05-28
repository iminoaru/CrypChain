import Blockchain from "../blockchain/blockchain";
import TransactionPool from "../wallet/transactionPool";
import Wallet from "../wallet";
import P2P from "./peerToPeer";


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

    mine() {
        const validTransactions = this.transactionPool.validTransactions()

        validTransactions.push(
            this.wallet.rewardTransaction(this.wallet, this.wallet.blockchainWallet())
        )

    }
}

export default Miner