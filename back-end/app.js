const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const cors = require('cors');
const logger = require('./src/loggingConfig');
const userRoutes = require('./src/routes/users/createUserRoutes');

const app = express();

const port = process.env.APP_PORT || 8000;
const morganFormat = process.env.MORGAN_FORMAT || 'combined';

app.use(morgan(morganFormat, { stream: logger.stream.write }));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!!!'));

app.use('/users', userRoutes);

const errorBuilder = (err) => ({
  status: 500,
  statusText: 'Internal Server Error',
  message: err.message,
  error: {
    errno: err.errno,
    call: err.syscall,
    code: err.code,
    severity: err.severity,
    message: err.message,
  },
});

app.use((err, req, res, next) => {
  logger.error(errorBuilder(err));
  next(err);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => res.status(500).json(errorBuilder(err)));

app.listen(port,
  () => logger.info(`server running on port: ${chalk.yellowBright(port)}`));
