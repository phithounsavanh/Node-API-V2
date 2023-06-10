require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoutes = require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware');
const app = express()

const PORT = process.env.PORT || 5000
const MONGO_URL = process.env.MONGO_URL

app.use(express.json())
app.use(express.urlencoded({extended: false}))


//routes

app.use("/api/products", productRoutes);

app.get('/', (req, res) => {
    throw new Error('this is error');
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Devtamin')
});

app.use(errorMiddleware);


mongoose.set("strictQuery", false)
mongoose.
connect(MONGO_URL)
.then(() => {
    console.log('connected to MongoDB')
    app.listen(PORT, ()=> {
        console.log(`Node API app is running on port ${PORT}`)
    });
}).catch((error) => {
    console.log(error)
})