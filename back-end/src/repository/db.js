const { Pool } = require('pg');
const _ = require('lodash');
const logger = require('../loggingConfig');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const emptyOrRows = (rows) => ((!rows) ? [] : rows);

const query = (sqlQuery, params) => new Promise((resolve, reject) => {
  logger.debug(`SQL: ${sqlQuery}`);
  logger.debug(`PARAMS: ${params}`);
  pool.query(sqlQuery, params)
    .then((res) => {
      const { rows } = res;
      const data = emptyOrRows(rows);
      logger.debug(`Total ${_.size(data)} row(s) received.`);
      resolve(emptyOrRows(rows));
    })
    .catch((err) => {
      reject(err);
    });
});
module.exports = query;
