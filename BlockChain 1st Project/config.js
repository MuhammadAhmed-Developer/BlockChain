const MINI_RATE = 1000 //1s = 1000ms
const INITIAL_DIFFICIULTY = 2;
const GENESIS_DATA = {
    timeStamp: 1,
    prevHash:"0000",
    hash:"0123",
    data:[],
    difficulty:INITIAL_DIFFICIULTY,
    nonce:0
}
module.exports = {GENESIS_DATA, MINI_RATE}