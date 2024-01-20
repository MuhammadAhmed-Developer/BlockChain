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
    if(chain<=this.chain.length){
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
        const {timeStamp,prevHash,hash,data} = chain[i]
        const realLastHash = chain[i-1].hash
        if(prevHash !== realLastHash) return false
        const validatedHash = cryptoHash(timeStamp,prevHash,data)
        if(hash !== validatedHash) return false
    }
    return true
  }
}

const blockChain = new BlockChain();
blockChain.addBlock({ data: "mining" });
const result = BlockChain.isValidChain(blockChain.chain)
console.log("result", result);
module.exports = BlockChain;
