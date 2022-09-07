const JWT = require('jsonwebtoken')

module.exports = {
	signAccessToken: userId => {
		return new Promise((resolve, reject) => {
			const payload = {
				name: 'usman007',
			}
			const options = {expiresIn: '1h', issuer: 'usman', audence: userId}
			JWT.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
				if (err) reject(err)
				resolve(token)
			})
		})
	},
}
