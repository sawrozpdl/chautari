import { USERNAME } from '../constants/schemas';

/**
 *
 * @param {string} string
 * @param {any} object
 * @returns {string}
 */
export const interpolate = (string: string, object: any): string => {
  Object.keys(object).forEach((key) => {
    string = string.replace(new RegExp(`:${key}`, 'g'), object[key]);
  });

  return string;
};

export const capitalize = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const toNormalCase = (string: string): string =>
  string
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str: string) => str.toUpperCase());

export const extractFullName = (user: any, mid = true): string => {
  const { firstName, middleName, lastName } = user;
  return `${firstName ? `${capitalize(firstName)}` : ''}${
    mid && middleName ? ` ${capitalize(middleName)}` : ''
  } ${lastName ? ` ${capitalize(lastName)}` : ''}`.trim();
};

export const extractInitials = (user: any, mid = true): string =>
  `${user.firstName ? user.firstName.charAt(0).toUpperCase() : ''}${
    mid && user.middleName ? user.middleName.charAt(0).toUpperCase() : ''
  }${user.lastName ? user.lastName.charAt(0).toUpperCase() : ''}`;

/**
 *
 * Parses query to usable object
 *
 * @param {String} query
 */
export const parseQuery = (query: any): any => {
  return query
    .substring(1, query.length)
    .split('&')
    .reduce((acc: any, curr: any) => {
      const items = curr.split('=');
      items[1] = items[1] && items[1].replace(/%20/g, ' ');
      return {
        ...acc,
        [items[0]]: items[1],
      };
    }, {});
};

/**
 *
 * Unparses object to query
 *
 * @param {String} query
 */
export const unParseQuery = (object: any): string => {
  return Object.keys(object)
    .reduce((acc: any, curr: any) => {
      return object[curr] ? `${acc}${curr}=${object[curr]}&` : acc;
    }, '?')
    .slice(0, -1);
};

const nullCounter = (obj: any): any => {
  let keyCount = 0;
  let nullCount = 0;
  for (const key in obj) {
    if (!obj[key]) {
      nullCount++;
      keyCount++;
    } else if (typeof obj[key] === 'object') {
      const count = nullCounter(obj[key]);
      keyCount += count.keyCount;
      nullCount += count.nullCount;
    } else keyCount++;
  }
  return {
    keyCount,
    nullCount,
  };
};

export const getProfileCompleteness = (user: any) => {
  const { nullCount, keyCount } = nullCounter(user);
  return ((keyCount - nullCount) / keyCount) * 100;
};

export const downloadCsv = (rows: any, name: string): void => {
  const csvContent =
    'data:text/csv;charset=utf-8,' +
    rows.map((e: string[]) => e.join(',')).join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${name}_${new Date().toISOString()}.csv`);
  document.body.appendChild(link);

  link.click();
};

export const truncate = (str: string, num: number): string =>
  str.length > num ? str.slice(0, num) + '...' : str;

export const isValidHttpUrl = (string: string) => {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
};

const regexMap: any = {
  [USERNAME]: '^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_.])$',
};

export const matches = (string: string, schema: string): boolean =>
  Boolean(string) && new RegExp(regexMap[schema]).test(string);

export const getInverseColor = (
  fore: string,
  { black = '#000000', white = '#ffffff' }
): string => {
  fore = fore.replace('#', '');
  const r = parseInt(fore.substr(0, 2), 16);
  const g = parseInt(fore.substr(2, 2), 16);
  const b = parseInt(fore.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? black : white;
};
