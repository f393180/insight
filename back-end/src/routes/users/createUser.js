const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { bcryptSaltRounds } = require('../../config/keys');
const logger = require('../../config/loggingConfig');
const { fetchUserByUsername, createUser } = require('../../repository/users');

const getUserFormDataFromRequest = (req) => {
  const { password } = req.body;
  const encPassword = bcrypt.hashSync(password, bcryptSaltRounds);
  logger.debug(`Plain Text: ${password} | Enc Text: ${encPassword}`);
  return {
    username: req.body.username,
    password: encPassword,
    role: req.body.role,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
};

const getValidationErrorResponseJson = (errors) => ({
  status: 422,
  statusText: 'Validation Error',
  message: 'Input data validation errors',
  errors: errors.array(),
});

const getDuplicateUserErrorResponseJson = (username) => ({
  status: 422,
  statusText: 'Validation Error',
  message: `User already exists with username: ${username}`,
  error: {
    message: `User already exists with username: ${username}`,
  },
});

const getSuccessResponseJson = (result) => ({
  status: 201,
  statusText: 'OK',
  message: 'User created.',
  data: result,
});

module.exports = (req, res, next) => {
  logger.info('Handling request for creating user.');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json(getValidationErrorResponseJson(errors));
  } else {
    const { username } = req.body;
    fetchUserByUsername(username).then((user) => {
      logger.debug(`User by username: ${user}`);
      if (user) {
        res.status(422).json(getDuplicateUserErrorResponseJson(username));
      } else {
        const userData = getUserFormDataFromRequest(req);
        createUser(userData).then((result) => {
          res.status(201).json(getSuccessResponseJson(result));
        }).catch((err) => next(err));
      }
    }).catch((err) => next(err));
  }
};
