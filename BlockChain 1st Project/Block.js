const hextoBinary = require("hex-to-binary")
const {GENESIS_DATA, MINI_RATE} = require("./config") 
const cryptoHash = require("./cryptoHash")
class Block{
    constructor({timeStamp,prevHash,hash,data,nonce,difficulty}){
     this.timeStamp = timeStamp;
     this.prevHash = prevHash;
     this.hash = hash;
     this.data = data;
     this.nonce = nonce;
     this.difficulty = difficulty
    }
  static genesis(){
    return new this(GENESIS_DATA)  // This Fuction is used for create 1st Block that is called genesis block
  }
  static mineBlock({prevBlock, data}){              // This Function is used for mine a Block
    // const timeStamp = Date.now()
    let hash,timeStamp;
    const prevHash = prevBlock.hash;
    let nonce = 0;
    let {difficulty} = prevBlock;
    do{
      nonce++
      timeStamp = Date.now()
      difficulty = Block.addjustDifficulty({originalBlock:prevBlock,timeStamp})
      hash = cryptoHash(timeStamp,prevHash,data,nonce,difficulty)
    }while(hextoBinary(hash).substring(0,difficulty)!=="0".repeat(difficulty))  // Apply loop until the first diffculty values of hash is equal to zero then loop stop
    return new this({
    timeStamp,prevHash,data,nonce,difficulty,hash  // return block after mining
    })
  }
  static addjustDifficulty({originalBlock,timeStamp}){
    const {difficulty} = originalBlock;
    if(difficulty < 1) return 1;
    const difference = timeStamp - originalBlock.timeStamp;
    if(difference > MINI_RATE) return difficulty - 1
    return difficulty + 1 
  }
}

// const firstBlock = new Block({timeStamp:"01-05-2023", prevHash:"000abc", hash:"ooo123", data:"Hellow World"})
// const genesisBlock = Block.gensis()
// console.log('grnesisBlock', genesisBlock)
// // console.log(firstBlock)
// const result =Block.mineBlock({prevBlock:firstBlock, data:"first block"})
// console.log('result', result)

module.exports = Block