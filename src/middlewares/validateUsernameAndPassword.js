function validateUsernameAndPassword(req, res, next) {
	const errors = []
	if (! req.body.username) {
		errors.push('username is required')
	}
	if (! req.body.password) {
		errors.push('password is required')
	}
	if (errors.length) {
		return res.status(400)
		.json({
			'message': 'Validation error',
			errors
		})
	}

	next()
}

module.exports = validateUsernameAndPassword
