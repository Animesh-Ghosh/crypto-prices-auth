const supportedCurrencies = ['btc', 'eth', 'bnb']

function validateCurrencyAndTarget(req, res, next) {
  const { currency, target } = req.query
	if (! supportedCurrencies.includes(currency.toLowerCase())) {
		res.status(400)
		.json({
			message: 'Currency not supported!'
		})

		return next('router')
	}
	if (target.toLowerCase() != 'usd') {
		res.status(400)
		.json({
			message: 'Target currency not supported!'
		})

		return next('router')
	}
	next()
}

module.exports = validateCurrencyAndTarget
