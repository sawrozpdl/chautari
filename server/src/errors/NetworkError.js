import HttpStatus from 'http-status-codes';

import BaseError from './BaseError';

/**
 * Error class for network error.
 */
class NetworkError extends BaseError {
  /**
   * Constructor of NetworkError.
   *
   * @param {Object} error
   * @param {String} error.message
   * @param {String} error.details
   * @param {Number} error.code
   */
  constructor({
    message = 'Something went wrong!',
    details = '',
    code = HttpStatus.INTERNAL_SERVER_ERROR,
  }) {
    super(message);

    this.details = details;
    this.code = code;
  }
}

export default NetworkError;
