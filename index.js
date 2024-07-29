const nodeCron = require('node-cron')
const {Connect, Save} = require('./db')
const {Extract} =  require('./extract')
const {Notifier} = require('./notifier')
const express = require('express')
const app = express()
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Automation service is Online!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

async function connect() { await Connect() }

connect();
const job = nodeCron.schedule("*/5 * * * *", 
    async function main(){
        const notices = await Extract();
        const res = await Save(notices);
        console.log(res);
        if(res === 1) console.log('Happy !');
        if(res != 1){
            Notifier(res);
        }
});
job.start();

