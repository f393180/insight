const userRoutes = require('express').Router();
const { body } = require('express-validator');

userRoutes.get('/', require('./getUsers'));
userRoutes.get('/:username', require('./getUserByUsername'));

const createUserValidators = [
  body('username')
    .isAlphanumeric()
    .isLength({ min: 6, max: 12 })
    .withMessage('Username must have 6 to 12 characters'),
  body('password')
    .isStrongPassword()
    .withMessage('password is not strong'),
  body('firstName')
    .isAlpha()
    .isLength({ min: 3, max: 15 })
    .withMessage('First name must have 3 to 15 characters'),
  body('lastName')
    .isAlpha()
    .isLength({ min: 3, max: 15 })
    .withMessage('Last name must have 3 to 15 characters'),
  body('role')
    .isIn(['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPER'])
    .withMessage('Role must be either ROLE_USER or ROLE_ADMIN or ROLE_SUPER'),
];
userRoutes.post('/', createUserValidators, require('./createUser'));

module.exports = userRoutes;
