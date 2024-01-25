const BlockChain = require("./blockChain");

const blockChain = new BlockChain
blockChain.addBlock({data:"new data"})
console.log(blockChain.chain[blockChain.chain.length - 1])
let prevTimeStamp, nextTimeStamp, nextBlock, timeDiff, averageTime;
const times = [];

for(i=0; i<1000; i++){
    prevTimeStamp = blockChain.chain[blockChain.chain.length - 1].timeStamp
    blockChain.addBlock({data:`block ${i}`})
    nextBlock = blockChain.chain[blockChain.chain.length - 1]
    nextTimeStamp = nextBlock.timeStamp

    timeDiff = nextTimeStamp - prevTimeStamp
    times.push(timeDiff)
    averageTime = times.reduce((total, num)=>(total + num))/times.length;
    // console.log(`Time to mini Block :${timeDiff}ms, Difficulty:${nextBlock.difficulty}, Average:${averageTime}ms`)
}