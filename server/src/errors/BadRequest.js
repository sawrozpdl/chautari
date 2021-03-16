import HttpStatus from 'http-status-codes';

import BaseError from './BaseError';

/**
 * Error class for bad request.
 */
class BadRequest extends BaseError {
  /**
   * Constructor of BadRequest Error.
   *
   * @param {Object} error
   * @param {String} error.message
   * @param {String} error.details
   * @param {Number} error.code
   */
  constructor({
    message = 'Bad request',
    details = '',
    code = HttpStatus.BadRequest,
  }) {
    super(message);

    this.details = details;
    this.code = code;
  }
}

export default BadRequest;
