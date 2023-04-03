require('dotenv').config();
const products=require('./routes/products');

const express=require('express');
const app=express();
const connectDB =require('./db/connect');

const notFoundMiddleware=require('./middleware/notfound');

// middleware
app.use(express.json())

// routes
app.get('/', (req, res)=>{
    res.send(`<h1>Store API</h1><a href='/api/v1/products'>Products</a>`)
})

app.use('/api/v1/products', products)

// products route


app.use(notFoundMiddleware)

// server
const PORT=(process.env.PORT || 3000)

const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen((PORT), console.log(`server listeing on port ${PORT}`))

    } catch (error) {
        console.log(error)
    }
}

start()