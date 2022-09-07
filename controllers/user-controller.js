const User = require('../models/User')
const {ok, bad_request, server_error} = require('../helpers/responseHelper')
const {signAccessToken} = require('../helpers/jwtHelper')

const signup = async (req, res, next) => {
	const {name, email, password} = req.body
	const user = new User({
		name,
		email,
		password,
	})
	let existingUser
	try {
		existingUser = await User.findOne({email: email})
	} catch (err) {
		return server_error(res, err)
	}
	if (existingUser) {
		return bad_request(res, 'user with same email address already exists')
	}
	try {
		const savedUser = await user.save()
		const token = await signAccessToken(savedUser._id)

		return ok(res, 201, {token})
	} catch (err) {
		return server_error(res, err)
	}
}

const login = async (req, res, next) => {
	const {email, password} = req.body
	let existingUser
	try {
		existingUser = await User.findOne({email: email})
	} catch (err) {
		return server_error(res, err)
	}
	if (!existingUser) {
		return bad_request(res, 'user not found')
	}

	const isMatch = await existingUser.isValidPassword(password)

	if (!isMatch) {
		return bad_request(res, 'Either email or password is incorrect')
	}
	const token = await signAccessToken(existingUser._id)
	return ok(res, 200, {token})
}

exports.signup = signup
exports.login = login
