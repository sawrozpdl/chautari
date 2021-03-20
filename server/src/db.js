import mongoose from 'mongoose';

import config from './config';

const { user, name, password, host, port } = config.database;

const connectionString = `mongodb://${user}:${password}@${host}:${port}/${name}`;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  autoIndex: false,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

export default mongoose;
