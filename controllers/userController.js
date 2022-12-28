import { UserModel } from '../models/User'
import { ok, bad_request, server_error } from '../helpers/responseHelper'
import { signAccessToken } from '../helpers/jwtHelper'

export const signup = async (req, res) => {
    const { name, email, password } = req.body
    const user = new UserModel({
        name,
        email,
        password,
    })
    let existingUser
    try {
        existingUser = await UserModel.findOne({ email: email })
    } catch (err) {
        return server_error(res, err)
    }
    if (existingUser) {
        return bad_request(res, 'user with same email address already exists')
    }
    try {
        const savedUser = await user.save()
        const token = await signAccessToken(savedUser._id)

        return ok(res, 201, { token })
    } catch (err) {
        return server_error(res, err)
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    let existingUser
    try {
        existingUser = await UserModel.findOne({ email: email })
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
    return ok(res, 200, { token })
}
