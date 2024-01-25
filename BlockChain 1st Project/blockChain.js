const Block = require("./Block");
const cryptoHash = require("./cryptoHash");

class BlockChain {
  constructor() {
    this.chain = [Block.genesis()];
  }
  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      prevBlock: this.chain[this.chain.length - 1],
      data,
    });
    this.chain.push(newBlock);
  }

  replaceChain(chain){
    if(chain.length <= this.chain.length){
        console.error("The Icoming Chain is not Longer")
        return
    }
    if(!BlockChain.isValidChain(chain)){
        console.error("The Icoming chain is not valid")
        return
    }
    this.chain = chain
  }

  static isValidChain(chain){
    if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
    for (let i = 1; i < chain.length; i++) {
        const {timeStamp,prevHash,hash,data,nonce,difficulty} = chain[i]
        const lastDifficulty = chain[i - 1].difficulty
        const realLastHash = chain[i-1].hash
        if(prevHash !== realLastHash) return false
        const validatedHash = cryptoHash(timeStamp,prevHash,data,nonce,difficulty)
        if(hash !== validatedHash) return false
        if(Math.abs(lastDifficulty - difficulty) > 1) return false
    }
    return true
  }
}

const blockChain = new BlockChain();
blockChain.addBlock({ data: "mining" });
blockChain.addBlock({ data: "block2" });
const result = BlockChain.isValidChain(blockChain.chain)
// console.log("result", blockChain);
module.exports = BlockChain;
