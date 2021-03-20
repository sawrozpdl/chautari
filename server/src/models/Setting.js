import mongoose from '../db';

const SettingSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      index: true,
    },
  },
  { strict: false }
);

const Setting = mongoose.model('Setting', SettingSchema);

export { Setting as default, SettingSchema };
