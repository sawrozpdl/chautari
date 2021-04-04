import React, { useMemo, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import {
  Container,
  Grid,
  makeStyles,
  Box,
  Typography,
} from '@material-ui/core';
import { interpolate, parseQuery } from '../../utils/string';
import { events } from '../../constants/socket';
import routes, { roomOptions } from '../../constants/routes';
import Messenger from '../../services/message';
import { ChatArea } from './components';
import toast from '../../utils/toast';

const RoomChat: React.FC<any> = (props: any) => {
  const {
    className,
    history,
    socket,
    settings,
    match,
    location,
    ...rest
  } = props;
  const useStyles = makeStyles((theme: any) => ({}));

  const classes: any = useStyles();

  const [roomInfo, setRoomInfo] = useState<any>({});
  const [messages, setMessages] = useState<Array<any>>([]);

  const query = useMemo(() => parseQuery(location.search), [location.search]);
  const messenger = useMemo((): any => new Messenger(socket, settings), [
    socket,
    settings,
  ]);

  const { name: roomName } = match.params;
  const { key } = query;

  const handleBackClick = (): void => {
    if (history.length > 0) {
      history.push(
        interpolate(routes.ROOM_OPTION, { option: roomOptions.JOIN })
      );
    } else history.goBack();
  };

  const leaveChat = (): void => {
    socket.emit(events.LEAVE_ROOM, {});
  };

  const joinChat = (): void => {
    socket.emit(events.JOIN_ROOM, { roomName, key });
  };

  useEffect(() => {
    joinChat();

    socket.on(events.MESSAGE, (data: any) => {
      setMessages((messages) => [...messages, data]);
    });

    socket.on(events.ROOM_INFO, (info: any) => {
      setRoomInfo(info);
    });

    socket.on(events.JOIN_REQUEST_REJECTED, (data: any) => {
      toast.error(data?.text || 'Join request rejected!');

      handleBackClick();
    });

    return (): void => {
      leaveChat();

      socket.off(events.MESSAGE);
      socket.off(events.ROOM_INFO);
    };
  }, []);

  const handleMessageSend = (message: string, callback: any): void => {
    messenger.text(message).md(true);

    setMessages((messages) => [...messages, messenger.self(true).build()]);

    messenger.self(false).send();

    if (callback) {
      callback();
    }
  };

  return (
    <div className={className} {...rest}>
      <Container maxWidth="md">
        <Grid container style={{ height: '80vh', marginTop: '24px' }}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '12px',
              position: 'relative',
            }}
          >
            <Button
              variant="outlined"
              onClick={handleBackClick}
              className={classes.backBtn}
              color="secondary"
            >
              {'Exit'}
            </Button>
            {roomInfo && roomInfo.roomName && (
              <div>
                {' '}
                <Box display="flex" alignItems="center">
                  <Typography
                    variant="h5"
                    color="inherit"
                    style={{ marginLeft: '10px' }}
                  >
                    {roomInfo.roomName}
                  </Typography>
                </Box>
              </div>
            )}
          </div>
          <Grid item lg={12} xs={12}>
            <ChatArea messages={messages} onSend={handleMessageSend} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

RoomChat.propTypes = {
  className: PropTypes.string,
  user: PropTypes.any,
  match: PropTypes.any,
};

export default RoomChat;
