const express = require('express')
const getCryptoPrice = require('./api')
const validateCurrencyAndTarget = require('./middlewares/validateCurrencyAndTarget')
const app = express()
const PORT = 3000

express.json()

app.get('/', function (req, res) {
	res.json({'message': 'Hello, world'})
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
