const express = require('express')
const subjectRouter = express.Router()

subjectRouter.get('/', (req, res) => {
    res.send(['physics', 'chemistry', 'maths'])
})

subjectRouter.get('/onesubject', (req, res) => {
    res.send('physics')
})

module.exports = subjectRouter