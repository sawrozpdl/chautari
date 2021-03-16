const app = require('../package.json');

const appName = process.env.APP_NAME;

/**
 * Application wide configurations.
 */
const config = {
  env: process.env.NODE_ENV || 'development',
  app: {
    name: app.name,
    version: app.version,
    baseUrl: process.env.BASE_URL,
    port: process.env.APP_PORT || 8080,
    host: process.env.APP_HOST || 'localhost',
  },
  auth: {
    api: {
      baseUrl: process.env.AUTH_API_BASE_URL,
      endpoints: {
        app: `/apps/${appName}`,
        appPrivacy: `/apps/${appName}/privacy`,
        appLocation: `/apps/${appName}/location`,
        appRedirectUrl: `/apps/${appName}/redirect-url`,
        appUsers: `/apps/${appName}/users`,
        authenticate: '/authenticate',
        userProfile: `/apps/${appName}/users/:username`,
        userRoles: `/apps/${appName}/users/:username/roles`,
        disableUser: `/apps/${appName}/users/:username/disable`,
      },
      clientId: process.env.AUTH_API_CLIENT_ID,
      clientSecret: process.env.AUTH_API_CLIENT_SECRET,
    },
    app: {
      baseUrl: process.env.AUTH_APP_BASE_URL,
    },
  },
  mail: {
    serverUrl: process.env.MAIL_SERVER_URL,
    apiKey: process.env.MAIL_SERVER_API_KEY || '',
  },
  database: {
    client: process.env.DB_CLIENT,
    ssl: process.env.DB_SSL === 'true',
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    /**
     * Type cast.
     *
     * @param {String} field
     * @param {String} useDefaultTypeCasting
     */
    typeCast: function castField(field, useDefaultTypeCasting) {
      if (field.type === 'BIT' && field.length === 1) {
        const bytes = field.buffer();

        return bytes && bytes[0] === 1;
      }

      return useDefaultTypeCasting();
    },
  },
  logging: {
    dir: process.env.LOG_DIR || 'logs',
    level: process.env.LOG_LEVEL || 'debug',
  },
};

export { config as default, appName };
