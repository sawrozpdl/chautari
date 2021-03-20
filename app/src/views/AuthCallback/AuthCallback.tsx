import React, { useContext } from 'react';

import routes from '../../constants/routes';
import UserContext from '../../context/UserContext';

import toast from '../../utils/toast';
import { actions } from '../../constants/url';
import { parseQuery } from '../../utils/string';
import { LoadingScreen } from '../../components';
import { persist, clear } from '../../services/token';
import { LOGIN_SUCCESS } from '../../constants/toastMessages';

const handleAuthLogin = async (props: any): Promise<void> => {
  const { token, history } = props;

  persist('', token);

  toast.success(LOGIN_SUCCESS);
  history.push(routes.APP);
};

const handleAuthLogout = async (props: any): Promise<void> => {
  const { history, logout } = props;

  clear();
  logout();

  history.push(routes.APP);
};

const AuthCallback: React.FC = (props: any): any => {
  const query = parseQuery(props.location.search);

  const { history } = props;

  const userCtx: any = useContext(UserContext);
  const { setUser, logout } = userCtx;

  const { token, action } = query;

  const filteredProps = {
    token,
    history,
    logout,
    setUser,
  };

  switch (action) {
    case actions.LOGIN:
      handleAuthLogin(filteredProps);
      break;
    case actions.LOGOUT:
      handleAuthLogout(filteredProps);
      break;
    default:
      break;
  }

  return <LoadingScreen />;
};

export default AuthCallback;
