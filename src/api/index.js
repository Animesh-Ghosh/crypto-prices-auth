const axios = require('axios')
const instance = axios.create({
	baseURL: 'https://api.cryptonator.com/api',
})

/**
 * @param {String} The cryptocurrency for which the price needs to be fetched.
 * @param {String} The target currency.
 *
 * @return {Number} The price of the cryptocurrency againts the target currency.
 */
async function getCryptoPrice(crypto = 'btc', target = 'usd') {
	let cryptoPrice = -1
	try {
		const response = await instance.get(`/ticker/${crypto}-${target}`)
		cryptoPrice = Number(response.data.ticker.price)
	} catch (err) {
		console.error(err)

	}

	return cryptoPrice
}

module.exports = getCryptoPrice

