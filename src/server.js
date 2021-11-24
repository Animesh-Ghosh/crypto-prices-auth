const express = require('express')
const { Sequelize } = require('sequelize')
const db = require('./db/models/index')
const getCryptoPrice = require('./api')
const validateCurrencyAndTarget = require('./middlewares/validateCurrencyAndTarget')
const validateUsernameAndPassword = require('./middlewares/validateUsernameAndPassword')
const app = express()
const PORT = 3000

app.use(express.json())

// TODO: add error handling middleware
// TODO: move routes to separate express.Routers
app.post('/sign-up', [
	validateUsernameAndPassword
], async function (req, res) {
	let { username, password } = req.body
	try {
		const user = await db.User.create({ username, password })
		res.status(200).json({'message': 'Signed up'})

	} catch (err) {
		if (err instanceof Sequelize.ValidationError) {
			console.log(err.errors)
			const errors = err.errors.map(error => error.message)
			res.status(400).json({'message': err.message,
				errors })
		} else {
			console.error(err)
			res.status(500).json({'message': 'Internal Server Error'})
		}
	}
})

app.get('/users', async function (req, res) {
	const users = await db.User.findAll({
		attributes: ['id', 'username', 'createdAt', 'updatedAt']
	})
	res.status(200).json({
		users
	})
})

router = express.Router()
router.use(validateCurrencyAndTarget)
router.get('/', async function (req, res) {
	const { currency, target } = req.query
	const price = await getCryptoPrice(currency.toLowerCase(), target.toLowerCase())
	res.json({
		price
	})
})

app.use('/prices', router)

app.listen(PORT, function () {
	console.log(`API started at http://localhost:${PORT}`)
})
