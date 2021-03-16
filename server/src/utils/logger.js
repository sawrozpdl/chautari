import fs from 'fs';
import path from 'path';
import winston, { format } from 'winston';

import config from '../config';

import 'winston-daily-rotate-file';

// Create log directory if it does not exist
if (!fs.existsSync(config.logging.dir)) {
  fs.mkdirSync(config.logging.dir);
}

// logFormat used for console logging
const logFormat = format.printf((info) => {
  const formattedNamespace = info.metadata.namespace
    ? info.metadata.namespace
    : '';

  return `${info.timestamp} [${info.level}] [${info.label}] [${formattedNamespace}]: ${info.message}`;
});

/**
 * Create a new winston logger.
 */
const logger = winston.createLogger({
  format: format.combine(
    format.label({ label: path.basename(require.main.filename) }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    // Format the metadata object
    format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
    logFormat
  ),
  transports: setupTransports(),
});

/**
 * Creates a child logger with namespace for logging.
 *
 * @param {String} namespace
 * @returns {Object}
 */
logger.withNamespace = function (namespace) {
  return logger.child({ namespace });
};

/**
 * Setup transports for winston.
 *
 * @returns {Array}
 */
function setupTransports() {
  const transports = [];

  transports.push(
    new winston.transports.Console({
      format: format.combine(format.colorize()),
      level: 'info',
    })
  );
  if (config.logging.isFileLogTransportEnabled) {
    transports.push(
      new winston.transports.DailyRotateFile({
        format: format.combine(format.timestamp(), format.json()),
        maxFiles: config.logging.retentionPeriod,
        level: config.logging.level,
        dirname: config.logging.level,
        datePattern: 'YYYY-MM-DD',
        filename: '%DATE%-debug.log',
      })
    );
  }

  return transports;
}

export const logStream = {
  /**
   * A writable stream for winston logger.
   *
   * @param {any} message
   */
  write(message) {
    logger.info(message.toString());
  },
};

export default logger;
