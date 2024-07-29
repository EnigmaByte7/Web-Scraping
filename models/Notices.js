const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const NoticeSchema = new Schema({
    notice: {type:String},
    date: {type:Date},
    link: {type:String}
})

const Notice = mongoose.model('Notice', NoticeSchema);
module.exports = Notice;