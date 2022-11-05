const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newsSchema = Schema({
    title : {
        type : String,
        required : true
    },
    author : {
        type : String,
        default : 'VANS Việt Nam'
    },
    date : {
        type : Date,
        default : Date.now()
    },
    content : {
        type : Array
    },
    img : {
        type : Array
    }
})

module.exports = mongoose.model('vans-news',newsSchema )