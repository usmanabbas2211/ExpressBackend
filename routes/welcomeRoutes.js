const express = require('express')
const {welcome} = require('../controllers/welcomeController')
const router = express.Router()

router.get('/', welcome)

module.exports = router
