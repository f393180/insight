const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { size } = require('lodash');
const jwt = require('jsonwebtoken');
const { jwtSecrete } = require('../../config/keys');
const logger = require('../../config/loggingConfig');
const { loadUserByUsername } = require('../../repository/users');

const getValidationErrorResponseJson = (errors) => ({
  status: 422,
  statusText: 'Validation Error',
  message: 'Input data validation errors',
  errors: errors.array(),
});

const getLoginFailureResponseJson = () => ({
  status: 401,
  statusText: 'Authentication Failure',
  message: 'Invalid username/password',
  error: {
    code: 'UNAUTHORIZED',
    message: 'Invalid username/password',
  },
});

const createPayload = (user) => ({
  username: user.username,
  firstName: user.firstName,
  lastName: user.lastName,
  role: user.role,
});

const getTokenResponseJson = (token) => ({
  status: 200,
  statusText: 'OK',
  message: 'User authenticated successfully.',
  data: {
    token: `Bearer ${token}`,
  },
});

module.exports = (req, res, next) => {
  logger.info('Handling login request');

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { username, password } = req.body;
    loadUserByUsername(username)
      .then((result) => {
        if (size(result) > 0) {
          const user = result[0];
          const isMatched = bcrypt.compareSync(password, user.password);
          logger.debug(`isMatched: ${isMatched}`);
          if (isMatched === true) {
            logger.debug('creating token');
            jwt.sign(
              createPayload(user),
              jwtSecrete,
              { expiresIn: 3600 },
              (err, token) => {
                res.status(200).json(getTokenResponseJson(token));
              },
            );
          } else {
            res.status(401).json(getLoginFailureResponseJson());
          }
        } else {
          res.status(401).json(getLoginFailureResponseJson());
        }
      }).catch((err) => next(err));
  } else {
    res.status(422).json(getValidationErrorResponseJson(errors));
  }
};
