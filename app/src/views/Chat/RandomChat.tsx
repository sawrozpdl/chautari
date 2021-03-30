import React, { useState, useEffect } from 'react';

import {
  Container,
  Button,
  Box,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';

import PropTypes from 'prop-types';
import { ChatArea } from './components';
import routes from '../../constants/routes';
import Matching from './components/Matching';
import ChatHalt from './components/ChatHalt';
import { events } from '../../constants/socket';
import { getHashAvatar } from '../../utils/user';
import SmartAvatar from '../../components/SmartAvatar';

const RandomChat: React.FC<any> = (props: any) => {
  const { className, history, socket, settings, ...rest } = props;
  const useStyles = makeStyles((theme: any) => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '70%',
      marginTop: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
    },
    signUpButton: {
      margin: theme.spacing(2, 0),
    },
    textField: {
      marginTop: theme.spacing(2),
    },
    typoSend: {
      marginTop: theme.spacing(1),
    },
    image: {
      perspectiveOrigin: 'left center',
      transformStyle: 'preserve-3d',
      perspective: 1500,
      '& > img': {
        maxWidth: '90%',
        height: 'auto',
        transform: 'rotateY(-35deg) rotateX(15deg)',
        backfaceVisibility: 'hidden',
        boxShadow: theme.shadows[16],
      },
    },
    shape: {
      position: 'absolute',
      top: 0,
      left: 0,
      '& > img': {
        maxWidth: '90%',
        height: 'auto',
      },
    },
  }));

  const classes: any = useStyles();

  const buildMessage = (text: string, isInfo = false, isMd = true) => ({
    user: !isInfo && settings.nickname,
    data: text,
    isInfo,
    time: Date.now(),
    isFromSelf: true,
    isMd: true,
  });

  const [matching, setMatching] = useState(true);
  const [stopped, setStopped] = useState(false);
  const [partner, setPartner] = useState<any>(null);
  const [roomInfo, setRoomInfo] = useState(null);
  const [messages, setMessages] = useState<Array<any>>([]);

  const leaveChat = (): void => {
    socket.emit(events.LEAVE_RANDOM_CHAT, {});
  };

  const joinChat = (): void => {
    socket.emit(events.JOIN_RANDOM_CHAT, {});
  };

  const handleBackClick = (): void => {
    if (history.length > 0) {
      history.push(routes.APP);
    } else history.goBack();
  };

  const handleRematch = (): void => {
    joinChat();
    setMessages([]);
    setMatching(true);
    setStopped(false);
  };

  const haltChat = (bySelf = false): void => {
    setMessages((messages) => [
      ...messages,
      {
        component: ChatHalt,
        onRematch: handleRematch,
        onBackClick: handleBackClick,
        bySelf,
      },
    ]);
  };

  const handleStopClick = (): void => {
    leaveChat();
    setStopped(true);

    haltChat(true);
  };

  useEffect(() => {
    socket.emit(events.JOIN_RANDOM_CHAT, {});

    socket.on(events.MESSAGE, (data: any) => {
      setMessages((messages) => [...messages, data]);
    });

    socket.on(events.ROOM_INFO, (info: any) => {
      setRoomInfo(info);
    });

    socket.on(events.MATCHED, (data: any) => {
      const { users, ...rest } = data;
      const partner =
        users.find((name: string) => name !== settings.nickname) || users[0];
      setMatching(false);
      setPartner(partner);
      setStopped(false);
      setMessages((messages) => [
        ...messages,
        buildMessage(`You matched with ${partner}!`, true),
      ]);
      socket.emit(events.JOIN_ROOM, rest);
    });

    socket.on(events.UNMATCHED, () => {
      setPartner(null);
      setRoomInfo(null);
      setStopped(true);
      haltChat();
    });

    return (): void => {
      if (!stopped) {
        leaveChat();
      }
      socket.off(events.JOIN_RANDOM_CHAT);
      socket.off(events.MESSAGE);
      socket.off(events.ROOM_INFO);
      socket.off(events.MATCHED);
      socket.off(events.UNMATCHED);
    };
  }, []);

  const handleMessageSend = (message: string, callback: any): void => {
    const messageCont = buildMessage(message);
    setMessages((messages) => [...messages, messageCont]);

    socket.emit(events.SEND_MESSAGE, { ...messageCont, isFromSelf: false });

    if (callback) {
      callback();
    }
  };

  return (
    <div className={className} {...rest}>
      <Container maxWidth="md">
        {matching ? (
          <Matching onStop={handleBackClick} />
        ) : (
          <Grid container style={{ height: '80vh', marginTop: '24px' }}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            >
              <Button
                variant="outlined"
                onClick={handleBackClick}
                className={classes.backBtn}
                color="secondary"
              >
                Exit
              </Button>
              <Box display="flex" alignItems="center">
                <SmartAvatar
                  alt="User"
                  className={classes.avatar}
                  size={32}
                  src={getHashAvatar({ name: partner })}
                />
                <Typography
                  variant="h5"
                  color="inherit"
                  style={{ marginLeft: '10px' }}
                >
                  {partner}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                onClick={stopped ? handleRematch : handleStopClick}
                className={classes.backBtn}
                color="primary"
              >
                {stopped ? 'Next' : 'Stop'}
              </Button>
            </div>
            <Grid item lg={12} xs={12}>
              <ChatArea
                messages={messages}
                active={Boolean(partner) && !stopped}
                fallback={ChatHalt}
                onRematch={handleRematch}
                onBackClick={handleBackClick}
                onSend={handleMessageSend}
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
};

RandomChat.propTypes = {
  className: PropTypes.string,
  user: PropTypes.any,
  match: PropTypes.any,
};

export default RandomChat;
