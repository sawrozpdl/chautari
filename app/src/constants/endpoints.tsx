import config from '../config';

export const GITHUB_URL = '#';

export const AUTH_APP_URL = `${config.auth.app.baseUrl}/${config.app.name}`;
export const AUTH_APP_LOGIN_URL = `${config.auth.app.baseUrl}${config.auth.app.endpoints.login}`;
export const AUTH_APP_ACCOUNT_URL = `${config.auth.app.baseUrl}${config.auth.app.endpoints.account}`;
export const AUTH_APP_REGISTER_URL = `${config.auth.app.baseUrl}${config.auth.app.endpoints.register}`;
export const AUTH_APP_FORGOT_PASSWORD_URL = `${config.auth.app.baseUrl}${config.auth.app.endpoints.forgotPassword}`;

export const LOGOUT_URL = `${config.auth.api.baseUrl}${config.auth.api.endpoints.logout}`;
export const AUTHENTICATE_URL = `${config.auth.api.baseUrl}${config.auth.api.endpoints.authenticate}`;

export const API_BASE_URL = `${config.api.baseUrl}`;
export const ROOMS_URL = `${config.api.baseUrl}/api${config.api.endpoints.rooms}`;
export const ROOM_USERS_URL = `${config.api.baseUrl}/api${config.api.endpoints.roomUsers}`;
export const USER_SETTINGS_URL = `${config.api.baseUrl}/api${config.api.endpoints.userSettings}`;
export const SELF_SETTINGS_URL = `${config.api.baseUrl}/api${config.api.endpoints.selfSettings}`;
