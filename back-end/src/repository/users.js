const query = require('./db');

const sql = {
  fetchAll: 'SELECT username, role, first_name, last_name FROM users',
  fetchUserByUsername: 'SELECT username, role, first_name, last_name FROM users WHERE username = $1',
  loadUserByUsername: 'SELECT * FROM users WHERE username = $1',
  createUser: 'INSERT INTO users(username, password, role, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
};

module.exports = {
  fetchAllUsers: () => query(sql.fetchAll),
  fetchUserByUsername: (username) => query(sql.fetchUserByUsername, [username]),
  loadUserByUsername: (username) => query(sql.loadUserByUsername, [username]),
  createUser: (data) => query(sql.createUser, [
    data.username,
    data.password,
    data.role,
    data.firstName,
    data.lastName,
  ]),
};
