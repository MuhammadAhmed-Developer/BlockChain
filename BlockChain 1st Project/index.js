const express = require("express")
const BlockChain = require("./blockChain")
const bodyParser = require("body-parser")
const PubSub = require("./publishSubscribe")
const request = require("request")

const app = express()
const blockChain = new BlockChain()
const pubSub = new PubSub({blockchain:blockChain})
const DEFAULT_PORT = 3000;

const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

setTimeout(()=>{
   pubSub.broadCastChain()
},1000)

app.use(bodyParser.json())
app.get("/api/blocks", (req,res)=>{
   res.json(blockChain.chain)
})

app.post("/api/mine", (req, res)=>{
    const {data} = req.body;
    blockChain.addBlock({data})
    pubSub.broadCastChain();
    res.redirect("/api/blocks")
})

const synChains = () =>{
   request({url:`${ROOT_NODE_ADDRESS}/api/blocks`},(error,response,body)=>{
      if(!error && response.statusCode === 200){
        const rootChain = JSON.parse(body)
        console.log("Replace chain on syn with", rootChain)
        blockChain.replaceChain(rootChain)
      }
   })
}

let PEER_PORT;

if(process.env.GENERATE_PEER_PORT == "true"){
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random()*1000)
}
const PORT = PEER_PORT || DEFAULT_PORT
app.listen(PORT,()=>{
   console.log(`listening to PORT: ${PORT}`)
   synChains()
})