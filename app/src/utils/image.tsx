export const createBlobUrl = async (
  data: any,
  callback?: any
): Promise<string> => {
  const url = URL.createObjectURL(await data.blob());
  if (callback) {
    await callback(url);
  }

  return url;
};
