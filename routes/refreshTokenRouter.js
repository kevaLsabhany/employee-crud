const express = require('express')
const refreshTokenController = require('../controllers/refreshTokenController')
const refreshTokenRouter = express.Router()

refreshTokenRouter.get('/', refreshTokenController.handleRefreshToken)

module.exports = refreshTokenRouter