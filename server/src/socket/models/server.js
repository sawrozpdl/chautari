const bannedIps = [];

export const banIP = (ip) => {
  bannedIps.push(ip);
};

export const unBanIP = (ip) => {
  bannedIps = bannedIps.filter((currIp) => currIp !== ip);
};

export const isBanned = (ip) => {
  return bannedIps.includes(ip);
};
