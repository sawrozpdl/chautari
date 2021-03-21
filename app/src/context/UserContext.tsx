import React, { createContext, useState } from 'react';

import PropTypes from 'prop-types';

import roles from '../constants/roles';
import { ANON } from '../constants/app';

const UserContext = createContext<object | null>(null);

const GuestUser = {
  id: 0,
  firstName: ANON,
  activeRoles: [roles.GUEST],
  ageGroup: null,
};

const UserProvider = (props: any): any => {
  const { children } = props;
  const [activeUser, setUser] = useState(GuestUser);
  const handleSetUser = (newUser: any, callback?: any): void => {
    setUser((oldUser) =>
      oldUser ? { ...newUser, ageGroup: oldUser.ageGroup } : GuestUser
    );

    if (newUser && newUser.id) {
      callback(newUser);
    }
  };

  const handleUpdateUser = (newProps: any): void => {
    setUser((oldUser) => ({ ...oldUser, ...newProps }));
  };

  const handleLogout = (): void => {
    setUser(GuestUser);
  };

  return (
    <UserContext.Provider
      value={{
        user: activeUser,
        logout: handleLogout,
        setUser: handleSetUser,
        updateUser: handleUpdateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.object,
};

export { UserContext as default, GuestUser, UserProvider };
