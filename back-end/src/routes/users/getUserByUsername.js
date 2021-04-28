const { size } = require('lodash');
const logger = require('../../config/loggingConfig');
const { fetchUserByUsername } = require('../../repository/users');

const notFoundResponseJson = (username) => ({
  status: 404,
  statusText: 'Not Found',
  message: `No user found with username: '${username}'.`,
  error: {
    code: 'NOT_FOUND',
    message: `No user found with username: '${username}'.`,
  },
});

const userFoundResponseJson = (result) => {
  const user = result[0];
  return {
    status: 200,
    statusText: 'OK',
    message: `User found with username: '${user.username}'.`,
    data: user,
  };
};

module.exports = (req, res, next) => {
  const { username } = req.params;
  logger.info(`Handling request for fetch user by username: ${username}.`);
  fetchUserByUsername(username)
    .then((result) => {
      if (size(result) > 0) {
        res.status(200).json(userFoundResponseJson(result));
      } else {
        res.status(404).json(notFoundResponseJson(username));
      }
    }).catch((err) => next(err));
};
