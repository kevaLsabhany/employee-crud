const express = require('express')
const logoutController = require('../controllers/logoutController')
const logoutRouter = express.Router()

logoutRouter.get('/', logoutController.handleLogout)

module.exports = logoutRouter