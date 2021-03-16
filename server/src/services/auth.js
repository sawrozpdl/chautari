import logger from '../utils/logger';
import * as userServices from '../services/user';
import NetworkError from '../errors/NetworkError';
import { EMPTY_TOKEN } from '../constants/errorMessages';
import UnauthorizedError from '../errors/UnauthorizedError';

/**
 * Get token from header in the request.
 *
 * @param {Object} req
 */
const getTokenFromHeaders = (req) => {
  const {
    headers: { authorization },
  } = req;

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    if (authorization.split(' ')[1] !== undefined) {
      return authorization.split(' ')[1];
    }
  }
  logger.error(`Token Error: ${EMPTY_TOKEN}`);

  throw new UnauthorizedError({ message: 'Token not found' });
};

/**
 * Validate current user with token received in header.
 *
 * @param {Object} req
 */
export async function validateUser(req) {
  const token = getTokenFromHeaders(req);
  const { data } = await userServices.fetchUser(token);

  return data;
}

/**
 * Validate user from the request.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 * @returns
 */
export async function authenticateRequest(req, res, next) {
  try {
    const {
      headers: { authorization },
    } = req;

    if (!authorization) {
      return next(new UnauthorizedError({ message: 'No auth schema' }));
    }

    const requestAuthenticationTag =
      authorization && authorization.split(' ')[0];

    if (requestAuthenticationTag === 'Bearer') {
      req.currentUser = await validateUser(req);

      return next();
    } else {
      return next(
        new UnauthorizedError({ message: 'Unsupported auth schema' })
      );
    }
  } catch (error) {
    if (error instanceof NetworkError) {
      return next(new NetworkError('Something went wrong'));
    }

    return next(new UnauthorizedError({ message: 'Token invalid or expired' }));
  }
}
