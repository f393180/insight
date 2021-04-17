const { validationResult } = require('express-validator');
const { size } = require('lodash');
const logger = require('../../loggingConfig');
const userService = require('../../service/users');

const getUserFormDataFromRequest = (req) => ({
  username: req.body.username,
  password: req.body.password,
  role: req.body.role,
  firstName: req.body.firstName,
  lastName: req.body.lastName,
});

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

const checkIfUserExistsWithUsername = async (username) => {
  const result = userService.getUserByUsername(username);
  return (size(result) > 0);
};

module.exports = (req, res, next) => {
  logger.info('Handling request for creating user.');

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json(getValidationErrorResponseJson(errors));
  } else if (checkIfUserExistsWithUsername(req.body.username)) {
    res.status(422).json(getDuplicateUserErrorResponseJson(req.body.username));
  } else {
    userService.createUser(getUserFormDataFromRequest(req))
      .then((result) => res.status(201).json(getSuccessResponseJson(result)))
      .catch((err) => next(err));
  }
};
