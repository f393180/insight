const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const logger = require('./src/loggingConfig');
const authRoutes = require('./src/routes/auth/createAuthRoutes');
const userRoutes = require('./src/routes/users/createUserRoutes');

const app = express();

const port = process.env.APP_PORT || 8000;
const morganFormat = process.env.MORGAN_FORMAT || 'combined';

app.use(morgan(morganFormat, { stream: logger.stream.write }));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!!!'));

app.use(passport.initialize());
require('./src/passportConfig')(passport);

app.use('/auth', passport.authenticate('jwt', { session: false }), authRoutes);
app.use('/users', passport.authenticate('jwt', { session: false }), userRoutes);

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
    trace: err.stack,
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
