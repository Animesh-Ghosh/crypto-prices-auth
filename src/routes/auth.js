const express = require('express')
const jwt = require('jsonwebtoken')
const validateUsernameAndPassword = require('../middlewares/validateUsernameAndPassword')
const db = require('../db/models/index')
const { SECRET } = require('../config')

const router = express.Router()
router.post('/sign-up', [
	validateUsernameAndPassword
], async function (req, res, next) {
	let { username, password } = req.body
	try {
		const user = await db.User.create({ username, password })
		return res.status(200).json({'message': 'Signed up'})

	} catch (err) {
		if (err instanceof Sequelize.ValidationError) {
			console.log(err.errors)
			const errors = err.errors.map(error => error.message)
			return res.status(400).json({ message: err.message,
				errors })
		} else {
			return next(err)
		}
	}
})

router.post('/login', [
	validateUsernameAndPassword
], async function (req, res, next) {
	const { username, password } = req.body
	const user = await db.User.findOne({ where: { username } })
	if (! user) {
		return res.status(401)
		.json({ message: 'Unauthorized!' })
	}
	const isValid = await user.passwordIsValid(password)
	if (! isValid) {
		return res.status(401)
		.json({ message: 'Unauthorized!' })
	}
	const token = jwt.sign({ id: user.id }, SECRET, { algorithm: 'HS256', expiresIn: '2h' })
	return res.status(200)
	.json({
		message: 'Logged in',
		accessToken: token
	})
})

module.exports = router
