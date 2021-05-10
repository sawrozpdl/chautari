import { NATIVE } from './constants/url';

const appName = process.env.REACT_APP_NAME;

const config: any = {
  env: process.env.NODE_ENV,
  app: {
    baseUrl: process.env.REACT_APP_BASE_URL,
    name: appName,
    tenorApiKey: process.env.REACT_APP_TENOR_API_KEY,
  },
  api: {
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    endpoints: {
      userSettings: '/users/:id/settings',
      selfSettings: '/users/self/settings',
      rooms: '/rooms',
      roomUsers: '/rooms/:roomId/users',
    },
  },
  ai: {
    api: {
      baseUrl: process.env.REACT_APP_AI_API_BASE_URL,
      endpoints: {
        ageDetect: '/detect/age',
        profanityDetect: '/detect/profanity',
      },
    },
  },
  auth: {
    api: {
      baseUrl: process.env.REACT_APP_AUTH_API_BASE_URL,
      endpoints: {
        apps: '/apps',
        verify: '/verify',
        app: `/apps/${appName}`,
        appPrivacy: `/apps/${appName}/privacy`,
        appLocation: `/apps/${appName}/location`,
        appRedirectUrl: `/apps/${appName}/redirect-url`,
        login: `/apps/${appName}/login`,
        logout: `/apps/${appName}/users/:username/logout`,
        appUsers: `/apps/${appName}/users`,
        authenticate: '/authenticate',
        changePassword: '/change-password',
        userProfile: `/apps/${appName}/users/:username`,
        userRoles: `/apps/${appName}/users/:username/roles`,
        disableUser: `/apps/${appName}/users/:username/disable`,
      },
    },
    app: {
      baseUrl: process.env.REACT_APP_AUTH_APP_BASE_URL,
      endpoints: {
        account: `/account?ref=${NATIVE}`,
        settings: `/settings?ref=${NATIVE}`,
        login: `/${appName}/login?ref=${NATIVE}`,
        register: `/${appName}/register?ref=${NATIVE}`,
        forgotPassword: `/${appName}/forgot-password?ref=${NATIVE}`,
      },
    },
  },
};

export { config as default, appName };
