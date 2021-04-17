const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
  getHash: (plainText) => bcrypt.hash(plainText, saltRounds),
};
