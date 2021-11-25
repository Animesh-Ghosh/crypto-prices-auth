const supportedCurrencies = ['btc', 'eth', 'bnb']

function validateCurrencyAndTarget(req, res, next) {
  const { currency, target } = req.query
	if (! supportedCurrencies.includes(currency.toLowerCase())) {
		return res.status(400)
		.json({
			message: 'Currency not supported!'
		})
	}
	if (target.toLowerCase() != 'usd') {
		return res.status(400)
		.json({
			message: 'Target currency not supported!'
		})
	}
	return next()
}

module.exports = validateCurrencyAndTarget
