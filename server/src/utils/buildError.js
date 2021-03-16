import HttpStatus from 'http-status-codes';

import BaseError from '../errors/BaseError';

/**
 * Build error response object.
 *
 * @param   {Error} err
 * @returns {Object}
 */
function buildError(err) {
  if (err instanceof BaseError) {
    return {
      code: err.code || HttpStatus.BAD_REQUEST,
      message: err.message,
    };
  }

  return {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message:
      err.message || HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
  };
}

export default buildError;
