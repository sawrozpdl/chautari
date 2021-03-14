import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import roles from '../constants/roles';

const UserContext = createContext<object | null>(null);

const GuestUser = {
  id: -1,
  firstName: 'Guest',
  activeRoles: [roles.GUEST],
};

const UserProvider = (props: any) => {
  const { children } = props;
  const [activeUser, setUser] = useState(GuestUser);
  const handleSetUser = (user: any) => {
    setUser(user || GuestUser);
  };

  const handleLogout = () => {
    setUser(GuestUser);
  };

  return (
    <UserContext.Provider
      value={{
        user: activeUser,
        logout: handleLogout,
        setUser: handleSetUser,
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
