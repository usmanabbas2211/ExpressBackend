const JWT = require('jsonwebtoken')

module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                name: 'usman007',
            }
            const options = {
                expiresIn: '1h',
                issuer: 'usman',
                audience: String(userId),
            }
            JWT.sign(
                payload,
                process.env.JWT_ACCESS_SECRET,
                options,
                (err, token) => {
                    if (err) reject(err)
                    resolve(token)
                }
            )
        })
    },
    verifyAccessToken: (token) => {
        return new Promise((resolve, reject) => {
            JWT.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
                if (err) reject(err)
                resolve(user)
            })
        })
    },
}
