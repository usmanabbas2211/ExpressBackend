import { body } from 'express-validator'

export const loginValidation = [
    body('email')
        .exists()
        .withMessage('email is required in body')
        .isEmail()
        .withMessage('email is not valid'),
    body('password')
        .exists()
        .withMessage('password is required in body')
        .isLength({ min: 8 })
        .withMessage('password length should not be less than 8 characters'),
]

export const signupValidation = [
    body('email')
        .exists()
        .withMessage('email is required in body')
        .isEmail()
        .withMessage('email is not valid'),
    body('name')
        .exists()
        .withMessage('name is required in body')
        .not()
        .isEmpty()
        .withMessage('name should not be empty'),
    body('password')
        .exists()
        .withMessage('password is required in body')
        .isLength({ min: 8 })
        .withMessage('password length should not be less than 8 characters'),
]
