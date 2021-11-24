function validateUsernameAndPassword(req, res, next) {
	const errors = []
	if (! req.body.username) {
		errors.push('username is required')
	}
	if (! req.body.password) {
		errors.push('password is required')
	}
	if (errors.length) {
		res.status(400)
		.json({
			'message': 'Validation error',
			errors
		})

		return next('router')
	}

	next()
}

module.exports = validateUsernameAndPassword
