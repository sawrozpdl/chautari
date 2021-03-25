/**
 * Get concatenated fullname from a user object.
 *
 * @param {Object} user
 * @returns {String}
 */
export function getFullName(user) {
  const { firstName, middleName, lastName } = user;

  let name = '';

  if (firstName) {
    name = firstName;
    if (middleName) {
      name = name + ' ' + middleName;
    }
    if (lastName) {
      name = name + ' ' + lastName;
    }
  } else {
    name = 'Guest';
  }

  return name;
}

/**
 * Returns a random hex color code.
 */
export const getRandomColor = () =>
  '#' + Math.floor(Math.random() * 16777215).toString(16);

export const cleanString = (string) => string.replace(/[|&;$%@"<>()+,]/g, '');

export const getRandomKey = () => Math.random().toString(36).substring(2);
