const query = require('./db');

const sql = {
  fetchAll: 'SELECT username, role, first_name, last_name FROM users',
  fecthByUsername: 'SELECT username, role, first_name, last_name FROM users WHERE username = $1',
  createUser: 'INSERT INTO users(username, password, role, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
};

const userRepository = {
  fetchAllUsers: () => query(sql.fetchAll),
  fecthUserByUsername: (username) => query(sql.fecthByUsername, [username]),
  createUser: (data) => query(sql.createUser, [
    data.username,
    data.password,
    data.role,
    data.firstName,
    data.lastName,
  ]),
};

module.exports = userRepository;
