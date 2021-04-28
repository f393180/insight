const logger = require('../../config/loggingConfig');
const { fetchAllUsers } = require('../../repository/users');

module.exports = (req, res, next) => {
  logger.info('Handling request for fetch all users.');
  fetchAllUsers()
    .then((result) => {
      res.status(200).json({
        status: 200,
        statusText: 'OK',
        message: 'All users retrieved.',
        data: result,
      });
    }).catch((err) => next(err));
};
