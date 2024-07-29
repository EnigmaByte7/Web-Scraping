const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();
const Notice = require('./models/Notices.js')


async function Connect(){
    const corsOptions = {
        origin : '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        optionsSuccessStatus: 200
    };
    
    app.use(cors(corsOptions));
    
    const mongoURI = `mongodb+srv://saxenay117:mongoDB2024%23@cluster1.unzxb3t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;
    mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
}

async function Save(data){
    const itemcount = await Notice.collection.countDocuments();
    if(itemcount === 0){
        for(let notice of data){
            const record = {notice : notice.notice, link: notice.link, date: new Date()};
            const newNotice = new Notice(record);
            await newNotice.save();
        }
        return 1
    }
    else{
        const odd = [];
        const notices  = await Notice.find();
        const existing = new Set(notices.map((n)=> n.notice));

        for(let i of data){
            if(!existing.has(i.notice)){
                const record = {notice : i.notice, link: i.link, date: new Date()};
                const newNotice = new Notice(record);
                await newNotice.save();
                odd.push(i);
            }
        }
        return odd;
    }
}

module.exports = {Connect, Save};