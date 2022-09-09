
const {bad_request, server_error} = require('../helpers/responseHelper')
const {verifyAccessToken} = require('../helpers/jwtHelper')

const authenticate=async (req,res,next)=>{
    if (!req.headers.authorization) return bad_request(res, 'Unauthorized access')
	const token = req.headers.authorization.split(' ')[1]
	let verified
	try {
		verified = await verifyAccessToken(token)
		req.user=verified
	} catch (err) {
		return server_error(res, err)
	}
    next()
}

exports.authenticate=authenticate