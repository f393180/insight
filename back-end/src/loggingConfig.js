const { createLogger, format, transports } = require('winston');

function formatParams(info) {
  const {
    timestamp, level, message, ...args
  } = info;
  const ts = timestamp.slice(0, 19).replace('T', ' ');

  return `${ts} ${level}: ${message} ${Object.keys(args).length
    ? JSON.stringify(args, '', '')
    : ''}`;
}

// https://github.com/winstonjs/winston/issues/1135
const fmt = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(formatParams),
);

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  format: fmt,
  transports: [
    new transports.Console(),
    new transports.File({ filename: './logs/insight.log', level: 'debug' }),
  ],
});

module.exports = logger;
