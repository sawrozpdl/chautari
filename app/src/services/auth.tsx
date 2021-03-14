import http from '../utils/http';

import * as tokenService from './token';
import { interpolate } from '../utils/string';
import { AUTHENTICATE_URL, LOGOUT_URL } from '../constants/endpoints';

/**
 * Log out of the system.
 *
 * @param {string} refreshToken
 */
export async function logout(username?: string): Promise<void> {
  await http.post(interpolate(LOGOUT_URL, { username }));

  tokenService.clear();
}

/**
 * Get the user from the accessToken.
 *
 * @returns {Promise<{accessToken, refreshToken}>}
 */
export async function authorizeUser(): Promise<any> {
  const { data } = await http.post(AUTHENTICATE_URL);

  return data;
}

/**
 * Refresh the access token.
 *
 * @param {string} refreshToken
 * @returns {Promise<{accessToken, refreshToken}>}
 */
export async function refresh(refreshToken: string): Promise<any> {
  const { data } = await http.post(AUTHENTICATE_URL, {
    headers: { Authorization: `Refresh ${refreshToken}` },
  });

  return data;
}
