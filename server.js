const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { dbConnect } = require('./utiles/db')

const socket = require('socket.io')
const http = require('http')
const server = http.createServer(app)

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))

const io = socket(server, {
    cors: {
        origin: '*',
        credentials: true
    }
})

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api/home', require('./routes/home/homeRoutes'))
app.use('/api', require('./routes/authRoutes'))
app.use('/api', require('./routes/home/orderRoutes'))
app.use('/api', require('./routes/home/cardRoutes'))
app.use('/api', require('./routes/dashboard/categoryRoutes'))
app.use('/api', require('./routes/dashboard/productRoutes'))
app.use('/api', require('./routes/dashboard/sellerRoutes'))
app.use('/api', require('./routes/home/customerAuthRoutes'))

app.get('/', (req, res)=>res.send('My backend'))
const port = process.env.PORT
dbConnect()
server.listen(port, ()=> console.log(` Server is running on port ${port}`))