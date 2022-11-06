require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('express-cors')
const mongoose = require('mongoose')
const productRouter = require('./routes/product.js')
const newsRouter = require('./routes/news.js')

const connectDB = async () => {
    try {
        mongoose.connect(`mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@cluster0.3wozsnm.mongodb.net/?retryWrites=true&w=majority`)
        console.log('mongooseDB is connected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

connectDB()

app.use(cors({
    allowedOrigins : ['https://glowing-elf-41f004.netlify.app']
}))
app.use(express.json())

app.use('/api/product', productRouter)
app.use('/api/news', newsRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})