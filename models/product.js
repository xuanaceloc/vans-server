const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = Schema({
    name : {
        type : String,
        required : true
    },
    brand : {
        type : String,
        required : true
    },
    productId : {
        type : String,
        required : true
    },
    price : {
        newPrice : {
            type : Number,
            required : true
        },
        oldPrice : {
            type : Number
        }
    },
    size : {
        type : Object,
        required : true
    },
    img : {
        type : Array,
        required : true
    },
    description : {
        type : String
    },
    newArrival : {
        type : Boolean
    },
    sale : {
        type : Number
    },
    bestSeller : {
        type : Boolean
    },
    detail : {
        productId : {
            type : String
        },
        color : {
            type : String
        },
        gender : {
            type : String
        },
        productMaterial : {
            type : String
        },
        collection : {
            type : String
        }
    }
})

module.exports = mongoose.model('productList', productSchema)