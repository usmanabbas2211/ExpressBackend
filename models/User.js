const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		select: false,
	},
})

userSchema.pre('save', async function (next) {
	try {
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(this.password, salt)
		this.password = hashedPassword
		next()
	} catch (err) {
		next(err)
	}
})

userSchema.methods.isValidPassword = async function (password) {
	try {
		// return await bcrypt.compare(password, this.password)
		return true
	} catch (err) {
		throw err
	}
}

module.exports = mongoose.model('User', userSchema)

//in mongodb it will be stored as users
