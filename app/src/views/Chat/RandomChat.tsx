import React, { useState, useEffect } from 'react';

import { Button, Paper, Input } from '@material-ui/core';
import { Container, Grid, Typography, makeStyles } from '@material-ui/core';

import PropTypes from 'prop-types';
import { ChatArea } from './components';
import { events } from '../../constants/socket';
import Matching from './components/Matching';
import ChatHalt from './components/ChatHalt';

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

  const [matching, setMatching] = useState(true);
  const [partner, setPartner] = useState(null);
  const [roomInfo, setRoomInfo] = useState(null);
  const [messages, setMessages] = useState<Array<any>>([]);

  useEffect(() => {
    socket.emit(events.JOIN_RANDOM_CHAT, {});

    socket.on(events.MESSAGE, (data: any) => {
      setMessages((messages) => [...messages, data]);
    });

    socket.on(events.ROOM_INFO, (info: any) => {
      setRoomInfo(info);
    });

    socket.on(events.MATCHED, (data: any) => {
      const { partner, ...rest } = data;
      setMatching(false);
      setPartner(partner);

      socket.emit(events.JOIN_ROOM, rest);
    });

    socket.on(events.UNMATCHED, (data: any) => {
      setPartner(null);
      setRoomInfo(null);
    });

    return (): void => {
      // socket.emit(events.LEAVE_RANDOM_CHAT, null);
    };
  }, []);

  const handleMessageSend = (message: string, callback: any): void => {
    const messageCont = {
      user: settings.nickname,
      data: message,
      time: Date.now(),
      isFromSelf: true,
      isMd: true,
    };
    setMessages((messages) => [...messages, messageCont]);

    socket.emit(events.SEND_MESSAGE, { ...messageCont, isFromSelf: false });

    if (callback) {
      callback();
    }
  };

  const handleBackClick = (): void => {
    history.goBack();
  };

  const handleRematch = (): void => {
    socket.emit(events.JOIN_RANDOM_CHAT, {});
    setMessages([]);
    setMatching(true);
  };

  return (
    <div className={className} {...rest}>
      <Container maxWidth="md">
        {matching ? (
          <Matching />
        ) : (
          <Grid container style={{ height: '80vh', marginTop: '24px' }}>
            <Button
              variant="outlined"
              onClick={handleBackClick}
              className={classes.backBtn}
              color="primary"
            >
              Exit
            </Button>
            <Grid item lg={12} xs={12}>
              <ChatArea
                messages={messages}
                active={Boolean(partner)}
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
