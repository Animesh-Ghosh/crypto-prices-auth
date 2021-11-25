const express = require('express')
const router = express.Router()
const authRouter = require('./auth')
const pricesRouter = require('./prices')

router.use('/', authRouter)
router.use('/prices', pricesRouter)

module.exports = router
