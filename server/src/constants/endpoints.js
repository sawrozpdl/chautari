import config from '../config';

export const LOGOUT_URL = `${config.auth.api.baseUrl}${config.auth.api.endpoints.logout}`;
export const AUTHENTICATE_URL = `${config.auth.api.baseUrl}${config.auth.api.endpoints.authenticate}`;
