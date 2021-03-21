import React, { Suspense, useContext, useEffect } from 'react';

import PropType from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';

import { useSocket } from '../hooks';
import routes from '../constants/routes';
import { events } from '../constants/socket';
import { LoadingScreen } from '../components';
import AppRoute from '../components/AppRoute';
import useSettings from '../hooks/useSettings';
import UserContext from '../context/UserContext';
import { getPublicSettings } from '../utils/user';
import { chatMode, GUEST } from '../constants/app';
import { API_BASE_URL } from '../constants/endpoints';
import { App, Settings, Chat, EditRoom, RoomList } from '../views';

const CoreRouter: React.FC<any> = (props: any): any => {
  const socket = useSocket(API_BASE_URL);

  const { history } = props;

  const userCtx: any = useContext(UserContext);
  const { user } = userCtx;

  const { settings } = useSettings();

  const userSettings = getPublicSettings(settings, user);

  const hasSetup = settings.nickname !== GUEST;

  useEffect(() => {
    if (!hasSetup) {
      return history.push(routes.SETUP);
    }

    socket?.emit(events.HELLO, userSettings);

    return (): void => {
      socket?.emit(events.BYE, true);
    };
  }, [socket, hasSetup]);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        <AppRoute
          exact
          path={routes.APP}
          component={App}
          socket={socket}
          settings={userSettings}
        />
        <AppRoute
          exact
          path={routes.SETTINGS}
          component={Settings}
          socket={socket}
          settings={userSettings}
        />
        <AppRoute
          exact
          path={routes.ROOM_LIST}
          component={RoomList}
          socket={socket}
          settings={userSettings}
        />
        <AppRoute
          exact
          path={routes.RANDOM_CHAT}
          component={Chat}
          mode={chatMode.RANDOM_CHAT}
          socket={socket}
          settings={userSettings}
        />
        <AppRoute
          exact
          path={routes.ROOM_CHAT}
          component={Chat}
          mode={chatMode.ROOM_CHAT}
          socket={socket}
          settings={userSettings}
        />
        <AppRoute
          exact
          path={routes.ROOM_EDIT}
          component={EditRoom}
          socket={socket}
          settings={userSettings}
        />
        <Redirect to={routes.APP} />
      </Switch>
    </Suspense>
  );
};

CoreRouter.propTypes = {
  user: PropType.any,
};

export default CoreRouter;
