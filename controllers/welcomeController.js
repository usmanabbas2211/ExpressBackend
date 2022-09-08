const {ok, bad_request, server_error} = require('../helpers/responseHelper')
const {verifyAccessToken} = require('../helpers/jwtHelper')

const welcome = async (req, res, next) => {
	console.log(req.headers)
	if (!req.headers.authorization) return bad_request(res, 'Unauthorized access')
	const token = req.headers.authorization.split(' ')[1]
	let verified
	try {
		verified = await verifyAccessToken(token)
	} catch (err) {
		return server_error(res, err)
	}
	return ok(res, 200, {verified})
}

exports.welcome = welcome
