import Setting from '../models/Setting';

const getSettingsForUser = async (userId) => {
  const setting = await Setting.findOne({ userId });

  return setting;
};

const syncSettingsForUser = async (userId, newSettings = { timestamp: 0 }) => {
  const existingSettings = await Setting.findOne({ userId });

  if (!existingSettings) {
    await Setting.create({ ...newSettings, userId });
  } else if (
    !existingSettings.get('timestamp') ||
    existingSettings.get('timestamp') < newSettings.timestamp
  ) {
    await existingSettings.replaceOne({ ...newSettings, userId });
  } else {
    return existingSettings;
  }

  return newSettings;
};

export { getSettingsForUser, syncSettingsForUser };
