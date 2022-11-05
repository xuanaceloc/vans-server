const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const setHeader = require('../middleware/setHeader')



// @router GET api/product/allVans
// @desc   get product all Vans
// access  Public

router.get('/all-vans',setHeader, async (req,res) => {
    try {
        const data = await Product.find().then(res => res)        
        res.json({success : true, message : 'find new arrival successfully' , product : data})
    } catch (error) {
        console.log(error)
        res.json({success : false, message : 'internal server'})
    }
})

// @router GET api/product/collection
// @desc   get product collections
// access  Public

router.get('/collection',setHeader, async (req,res) => {
    const collection = req.query.collection || ''
    const limit = req.query.limit 
    try {
        const data = await Product.find({collection : collection}).then(res => {
            const list =  res.filter((item) => {
                return item.detail.collection === collection
            })
            if(limit && list.length > limit ) return list.slice(0,limit)
            return list
        })        
        res.json({success : true, message : 'find collection successfully' , product : data})
    } catch (error) {
        console.log(error)
        res.json({success : false, message : 'internal server'})
    }
})


// @router GET api/product/new arrival
// @desc   get product new arrivals
// access  Public

router.get('/new-arrival',setHeader, async (req,res) => {
    try {
        const data = await Product.find({newArrival : true}).then(res => res)        
        res.json({success : true, message : 'find new arrival successfully' , product : data})
    } catch (error) {
        console.log(error)
        res.json({success : false, message : 'internal server'})
    }
})

// @router GET api/product/bestseller
// @desc   get product best seller
// access  Public

router.get('/best-seller',setHeader, async (req,res) => {
    try {
        const data = await Product.find({bestSeller : true}).then(res => res)        
        res.json({success : true, message : 'find best seller successfully' , product : data})
    } catch (error) {
        console.log(error)
        res.json({success : false, message : 'internal server'})
    }
})

// @router GET api/product/sale off
// @desc   get product sale off
// access  Public

router.get('/sale-off',setHeader, async (req,res) => {
    const sale = req.query.sale || 'all'
    try {
        const data = await Product.find({sale : {$gte : 1} }).then(res => {
            if(sale === 'all') {
                return res
            } else {
                const saleList = res.filter((item) => {
                    return item.sale <= sale
                })
                return saleList
            }
        })  
        res.json({success : true, message : 'find new arrival successfully' , product : data})
    } catch (error) {
        console.log(error)
        res.json({success : false, message : 'internal server'})
    }
})

// @router GET api/product/id
// @desc   get product by id
// access  Public

router.get('/id',setHeader, async (req,res) => {
    const productId = req.query.productId
    try {
        const data = await Product.find({productId : productId }).then(res => res) 
        // console.log(data) 
        res.json({success : true, message : 'find product by id successfully' , product : data})
    } catch (error) {
        console.log(error)
        res.json({success : false, message : 'internal server'})
    }
})

// @router POST api/product
// @desc   post product
// access  Public

router.post('/',setHeader, async (req,res) => {
    const {info} = req.body
    const { name, brand, productId, newPrice,oldPrice, 
            sizeQuality, productImg, description, 
            collection, detail, newArrival, sale,
            bestSeller } = info

    if(!name || !brand || !productId || !newPrice || !sizeQuality || !productImg || !collection) {
        return res.json({success : false, message : 'empty value'})
    }

    const productImgArray = Object.keys(productImg).map(key => productImg[key])
    try {
        const product = new Product({
            name, 
            brand,
            productId,
            price : {
                newPrice,
                oldPrice
            },
            size : sizeQuality,
            img : productImgArray,
            description,
            collection,
            detail,
            newArrival,
            sale,
            bestSeller
        })
        await product.save()
        
        res.json({success : true, message : 'create product successfully', product : product})
    } catch (error) {
        console.log(error)
    }
})


module.exports = router
