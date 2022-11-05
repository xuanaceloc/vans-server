const express = require('express')
const router = express.Router()
const News = require('../models/news')
const setHeader = require('../middleware/setHeader')

// @router GET api/news/id
// @desc   get news detail
// access  Public

router.get('/detail', setHeader, async (req,res) => {
    const id = req.query.id
    try {
        const detailNews = await News.findById(id)
        res.json({success : true, message : 'find news by id successfully', news :detailNews })
    } catch (error) {   
        res.json({success : false, message : 'find news by id failure' })
        console.log(error)
    }
})

// @router GET api/news
// @desc   get news
// access  Public
router.get('/',setHeader,async (req,res) => {
    try {
        const newsList = await News.find()
        res.json({success : true, message : 'get list news successfully', newsList : newsList})
    } catch (error) {
        console.log(error)
        res.json({success : false, message : 'get news failure'})
    }
})


// @router POST api/news
// @desc   post news
// access  Public

router.post('/',setHeader, async (req,res) => {
    const {title, author, date, content, img} = req.body
    let dateDefault
   
    try {
        const news = new News({
            title,
            author : author || 'VANS Việt Nam',
            date : date || dateDefault,
            content,
            img
        })

        await news.save()

        res.json({success : true, message : 'create news successfully', news : news})
    } catch (error) {
        res.json({success : false, message : 'create news failure'})
        console.log(error)
    }
})

module.exports = router