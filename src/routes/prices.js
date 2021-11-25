const express = require('express')
const jwt = require('express-jwt')
const validateCurrencyAndTarget = require('../middlewares/validateCurrencyAndTarget')
const getCryptoPrice = require('../utils')
const { SECRET } = require('../config')
const db = require('../db/models')

router = express.Router()
router.get('/', [
	jwt({ secret: SECRET, algorithms: ['HS256'] }),
	// need to check if the User exists within the db or not
	async function (req, res, next) {
		const user = await db.User.findByPk(req.user.id)
		if (! user) {
			return res.status(401).json({ message: 'Unauthorized!' })
		}
		next()
	},
	validateCurrencyAndTarget
], async function (req, res) {
	let { currency, target } = req.query
	const price = await getCryptoPrice(currency, target)
	return res.json({
		price
	})
})
router.use(function (err, req, res, next) {
	if (err.name == 'UnauthorizedError') {
		return res.status(401).json({ message: 'Unauthorized!' })
	} else {
		next(err)
	}
})

module.exports = router
