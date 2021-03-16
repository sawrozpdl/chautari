import HttpStatus from 'http-status-codes';

import BaseError from './BaseError';

/**
 * Error class for Token Error.
 */
class UnauthorizedError extends BaseError {
  /**
   * Constructor of NetworkError.
   *
   * @param {Object} error
   * @param {String} error.message
   * @param {String} error.details
   * @param {Number} error.code
   */
  constructor({
    message = 'Not authorized',
    details = '',
    code = HttpStatus.UNAUTHORIZED,
  }) {
    super(message);
    this.details = details;
    this.code = code;
  }
}

export default UnauthorizedError;
