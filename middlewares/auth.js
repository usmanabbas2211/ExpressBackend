import { bad_request, server_error } from '../helpers/responseHelper'
import { verifyAccessToken } from '../helpers/jwtHelper'

export const authenticate = async (req, res, next) => {
    if (!req.headers.authorization)
        return bad_request(res, 'Unauthorized access')
    const token = req.headers.authorization.split(' ')[1]
    let verified
    try {
        verified = await verifyAccessToken(token)
        req.user = verified
    } catch (err) {
        return server_error(res, err)
    }
    next()
}
