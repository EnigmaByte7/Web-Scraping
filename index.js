const nodeCron = require('node-cron')
const {Connect, Save} = require('./db')
const {Extract} =  require('./extract')
const {Notifier} = require('./notifier')

async function connect() { await Connect() }

connect();
async function main(){
    const notices = await Extract();
    const res = await Save(notices);
    console.log(res);
    if(res === 1) console.log('Happy !');
    if(res != 1){
        Notifier(res);
    }
}
main();

