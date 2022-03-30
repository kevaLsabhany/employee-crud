require('dotenv').config()
const cookieParser = require('cookie-parser')
const express = require('express')
const connectDB = require('./config/dbConn')
const logger = require('./middleware/logger')
const verifyJwt = require('./middleware/verifyJwt')
const mongoose = require('mongoose')

connectDB()

const app = express()

app.use(logger)

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use(cookieParser())

app.use('/register', require('./routes/registerRouter'))

app.use('/auth', require('./routes/authRouter'))

app.use('/refresh', require('./routes/refreshTokenRouter'))

app.use('/subject', require('./routes/subjectRouter'))

app.use('/logout', require('./routes/logoutRouter'))

app.use(verifyJwt)
app.use('/employee', require('./routes/employeeRouter'))

mongoose.connection.once('open', () => {
    console.log('Database connected...')
    app.listen(3000, () => console.log('listening on port 3000...'))
})
