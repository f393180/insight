const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { jwtSecrete } = require('./keys');
const { loadUserByUsername } = require('../repository/users');
const logger = require('./loggingConfig');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecrete,
};

module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    const { username } = jwt_payload;
    logger.debug(`Username from token: ${username}`);
    loadUserByUsername(username)
      .then((result) => {
        if (result) {
          return done(null, result[0]);
        }
        return done(null, false);
      }).catch((err) => done(err, false));
  }));
};
