import React, { Suspense, useContext, useEffect, useState } from 'react';

import PropType from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';

import ReportIcon from '@material-ui/icons/Report';
import { Fab, Typography, Paper, Tooltip } from '@material-ui/core';

import toast from '../utils/toast';
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
import {
  App,
  Settings,
  RandomChat,
  RoomChat,
  EditRoom,
  RoomList,
} from '../views';

const defaultState = {
  rooms: { totalRooms: 0 },
  users: { inQueue: 0, idle: 1, inRoom: 0 },
};

const CoreRouter: React.FC<any> = (props: any): any => {
  const socket = useSocket(API_BASE_URL);

  const { history } = props;

  const userCtx: any = useContext(UserContext);
  const { user } = userCtx;

  const { settings } = useSettings();

  const userSettings = getPublicSettings(settings, user);

  const [serverState, setSeverState] = useState(defaultState);

  const hasSetup = settings.nickname && settings.nickname !== GUEST;

  useEffect(() => {
    if (!hasSetup) {
      return history.push(routes.SETUP);
    }

    socket?.on(events.CONNECT, () => {
      socket.emit(events.HELLO, userSettings);

      toast.info('Connected to the server!');
    });

    socket?.on(events.DISCONNECT, () => {
      toast.error('You got disconnected from the server!');

      history.push(routes.APP);
    });

    socket?.on(events.SERVER_INFO, (data: any) => {
      setSeverState(data);
    });

    socket?.on(events.BANNED_FROM_SERVER, (): void => {
      toast.info(`You have been banned from this server!`);
      socket.emit(events.ACK_LEAVE, {});
    });

    socket?.on(events.REPORTED, (): void => {
      toast.info(`User has been reported!`);
    });

    socket?.on(events.PRIVATE_MESSAGE, (data: any): void => {
      toast[data.type || 'info'](data.message);

      if (data.noAccess) {
        history.push(routes.APP);
      }
    });

    return (): void => {
      // socket?.emit(events.BYE, true);
    };
  }, [socket, hasSetup]);

  const goToVerification = (): void => {
    history.push(routes.VERIFY);
  };

  const { rooms, users } = serverState;

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
          component={RandomChat}
          mode={chatMode.RANDOM_CHAT}
          socket={socket}
          settings={userSettings}
        />
        <AppRoute
          exact
          path={routes.ROOM_CHAT}
          component={RoomChat}
          mode={chatMode.ROOM_CHAT}
          socket={socket}
          settings={userSettings}
        />
        <AppRoute
          exact
          path={routes.ROOM_OPTION}
          component={EditRoom}
          socket={socket}
          settings={userSettings}
        />
        <Redirect to={routes.APP} />
      </Switch>

      {!user.ageGroup && (
        <Fab
          variant="extended"
          size="medium"
          color="secondary"
          onClick={goToVerification}
          aria-label="add"
          style={{
            margin: '12px',
            position: 'absolute',
            bottom: '12px',
            right: '12px',
          }}
        >
          <ReportIcon style={{ marginRight: '6px' }} />
          <Typography variant="body2" color={'inherit'}>
            {'Verify age'}
          </Typography>
        </Fab>
      )}

      <Paper
        style={{
          padding: '12px',
          borderRadius: '6px',
          margin: '12px',
          position: 'absolute',
          bottom: '12px',
          left: '12px',
        }}
      >
        <Typography variant="body2" color={'inherit'}>
          {rooms.totalRooms + ' Rooms'}
        </Typography>
        <Tooltip
          title={
            <div>
              <Typography variant="body2" color={'inherit'}>
                {users.idle + ' Idle'}
              </Typography>
              <Typography variant="body2" color={'inherit'}>
                {users.inQueue + ' in Queue'}
              </Typography>
              <Typography variant="body2" color={'inherit'}>
                {users.inRoom + ' in Room'}
              </Typography>
            </div>
          }
        >
          <Typography variant="body2" color={'inherit'}>
            {users.idle + users.inQueue + users.inRoom + ' Online'}
          </Typography>
        </Tooltip>
      </Paper>
    </Suspense>
  );
};

CoreRouter.propTypes = {
  user: PropType.any,
};

export default CoreRouter;
