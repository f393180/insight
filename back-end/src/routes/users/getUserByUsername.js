const { size } = require('lodash');
const logger = require('../../loggingConfig');
const userService = require('../../service/users');

module.exports = (req, res, next) => {
  const { username } = req.params;
  logger.info(`Handling request for fetch user by username: ${username}.`);
  userService.getUserByUsername(username)
    .then((result) => {
      if (size(result) > 0) {
        res.status(200).json({
          status: 200,
          statusText: 'OK',
          message: `User found with username: '${username}'.`,
          data: result,
        });
      } else {
        res.status(404).json({
          status: 404,
          statusText: 'Not Found',
          message: `No user found with username: '${username}'.`,
          error: {
            code: 'NOT_FOUND',
            message: `No user found with username: '${username}'.`,
          },
        });
      }
    }).catch((err) => next(err));
};
