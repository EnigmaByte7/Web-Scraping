require('dotenv').config();

async function Notifier(value) {
    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    let data;
    try{
        const response = await fetch('https://notifyu-server.onrender.com/getdata');
        if(response.ok){
            data = await response.json();
        }
    }
    catch(err){
        console.log(err);
    }

    console.log(data);
    console.log(value);

    if (data.length > 0){
        for(let i of value){
            for(let j of data){         
                client.messages
                .create({
                    body: `\nUpdate from JEC! \n\n${i.notice}\n\n${i.link ? ` Check here - ${i.link}` : ''}`,
                    from: '+18149134114',
                    to: '+91'+j.contact
                })
                .then(message => console.log(message, 'sent!'));
            }
        }
    }
}

module.exports = {Notifier};