const authRoutes = require('express').Router();
const { body } = require('express-validator');

const loginValidators = [
  body('username')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Username is empty'),
  body('password')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Password is empty'),
];

authRoutes.post('/login', loginValidators, require('./login'));

module.exports = authRoutes;
