import React, { useState, useEffect, useMemo } from 'react';

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
import Messenger from '../../services/message';
import { getHashAvatar } from '../../utils/user';
import { listToString } from '../../utils/string';
import { getCommonInterests } from '../../utils/chat';
import SmartAvatar from '../../components/SmartAvatar';

const useStyles = makeStyles((theme: any) => ({
  partnerCont: {
    position: 'relative',
  },
  interestsCont: {
    position: 'absolute',
    left: 0,
    width: '100%',
    textAlign: 'center',
    marginTop: theme.spacing(1.5),
  },
}));

const RandomChat: React.FC<any> = (props: any) => {
  const { className, history, socket, settings, ...rest } = props;

  const classes: any = useStyles();

  const isInterestBased =
    settings.interestMatching && Boolean(settings.interests.length);

  const isAgeBased =
    settings.ageGroupMatching && Boolean(settings.user.ageGroup);

  const messenger = useMemo((): any => new Messenger(socket, settings), [
    socket,
    settings,
  ]);

  const [matching, setMatching] = useState(true);
  const [stopped, setStopped] = useState(false);
  const [partner, setPartner] = useState<any>(null);
  const [roomInfo, setRoomInfo] = useState(null);
  const [commonInterests, setCommonInterests] = useState<Array<string>>([]);
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
      if (info.users?.length < 2) return;

      setRoomInfo(info);
      const partner =
        info.users.find(
          (user: any): boolean => user.nickname !== settings.nickname
        ) || info.users[0];

      setPartner(partner);
      setMessages((messages) => [
        ...messages,
        messenger
          .text(`You matched with ${partner.nickname}!`)
          .build({ isInfo: true }),
      ]);

      if (isInterestBased) {
        setCommonInterests(
          getCommonInterests(partner.interests, settings.interests)
        );
      }
    });

    socket.on(events.MATCHED, (data: any) => {
      setMatching(false);
      setPartner({});
      setStopped(false);
      socket.emit(events.JOIN_ROOM, data);
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

  const handleMessageSend = (
    message: string,
    callback: any,
    isMd = false,
    isGif = false
  ): void => {
    messenger[isGif ? 'gif' : 'text'](message).md(isMd);

    setMessages((messages) => [...messages, messenger.self(true).build()]);

    messenger.self(false).send();

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
                position: 'relative',
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
              {partner && partner.nickname && (
                <div>
                  {' '}
                  <Box display="flex" alignItems="center">
                    <SmartAvatar
                      alt="User"
                      className={classes.avatar}
                      size={32}
                      src={getHashAvatar({ name: partner.nickname })}
                    />
                    <Typography
                      variant="h5"
                      color="inherit"
                      style={{ marginLeft: '10px', color: partner.color }}
                    >
                      {partner.nickname}
                    </Typography>
                    {isAgeBased && (
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        style={{
                          marginLeft: '5px',
                          position: 'relative',
                          bottom: '5px',
                        }}
                      >
                        {'Age Buddy'}
                      </Typography>
                    )}
                  </Box>
                  {commonInterests && commonInterests.length ? (
                    <Typography
                      className={classes.interestsCont}
                      variant="subtitle2"
                      color="textSecondary"
                    >
                      {'Common Interests: ' + listToString(commonInterests)}
                    </Typography>
                  ) : (
                    <></>
                  )}
                </div>
              )}
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
                censor={settings.safeMode}
                active={Boolean(partner) && !stopped}
                onSend={handleMessageSend}
                socket={socket}
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
