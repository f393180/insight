const { getHash } = require('./crypto');
const userRepository = require('../repository/users');

const getAllUsers = () => userRepository.fetchAllUsers();

const getUserByUsername = (username) => userRepository.fecthUserByUsername(username);

const createUser = async (userData) => {
  const encodedPassword = await getHash(userData.password);
  const updatedUserData = { ...userData, password: encodedPassword };
  return userRepository.createUser(updatedUserData);
};

module.exports = {
  getAllUsers,
  getUserByUsername,
  createUser,
};
