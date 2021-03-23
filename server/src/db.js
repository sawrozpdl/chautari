import mongoose from 'mongoose';

import config from './config';
import logger from './utils/logger';

const { user, name, password, host, port } = config.database;

const connectionString = `mongodb://${user}:${password}@${host}:${port}/${name}`;

try {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    autoIndex: false,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
} catch (_) {
  logger.error("Couldn't connect to the database!");
}

export default mongoose;
