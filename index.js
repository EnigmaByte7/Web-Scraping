const nodeCron = require('node-cron')
const {Connect, Save} = require('./db')
const {Extract} =  require('./extract')
const {Notifier} = require('./notifier')
const express = require('express');
const app = express();

app.get('/', (req,res)=>{
    res.send('Automation service is running!');
})

async function connect() { await Connect() }

connect();
nodeCron.schedule("*/5 * * * *", ()=> {
    async function main(){
        const notices = await Extract();
        const res = await Save(notices);
        console.log(res);
        if(res === 1) console.log('Happy !');
        if(res != 1){
            Notifier(res);
        }
    }
})


app.listen(1000, () => {
    console.log(`Notifyu listening on port 1000`)
  })

