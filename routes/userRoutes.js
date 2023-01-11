import express from 'express'
import { signup, login } from '../controllers/userController'
const router = express.Router()
import {
    loginValidation,
    signupValidation,
} from '../middlewares/user.validations'
import { validateRequest } from '../middlewares/validateRequest'

router.route('/signup').post(signupValidation, validateRequest, signup)
router.route('/login').post(loginValidation, validateRequest, login)

export default router
