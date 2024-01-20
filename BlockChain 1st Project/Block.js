const {GENESIS_DATA} = require("./config") 
const cryptoHash = require("./cryptoHash")
class Block{
    constructor({timeStamp,prevHash,hash,data}){
     this.timeStamp = timeStamp;
     this.prevHash = prevHash;
     this.hash = hash;
     this.data = data
    }
  static genesis(){
    return new this(GENESIS_DATA)  // This Fuction is used for create 1st Block that is called genesis block
  }
  static mineBlock({prevBlock, data}){              // This Function is used for mine a Block
    const timeStamp = Date.now()
    const prevHash = prevBlock.hash;
    return new this({
        timeStamp,
        prevHash,
        data,
        hash:cryptoHash(timeStamp,prevHash,data)  // create sha256 key hash
    })
  }
}

// const firstBlock = new Block({timeStamp:"01-05-2023", prevHash:"000abc", hash:"ooo123", data:"Hellow World"})
// const genesisBlock = Block.gensis()
// console.log('grnesisBlock', genesisBlock)
// // console.log(firstBlock)
// const result =Block.mineBlock({prevBlock:firstBlock, data:"first block"})
// console.log('result', result)

module.exports = Block