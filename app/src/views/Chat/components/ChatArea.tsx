import React, { useEffect, useMemo, useState, useCallback } from 'react';

import Tenor from 'react-tenor';

import SendIcon from '@material-ui/icons/Send';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { Button, Grid, TextField, Typography, Paper } from '@material-ui/core';

import 'react-tenor/dist/styles.css';

import Messages from './Messages';
import config from '../../../config';
import debounce from '../../../utils/debounce';
import { events } from '../../../constants/socket';
import { listToString } from '../../../utils/string';
import { getRandomChatGuide } from '../../../utils/chat';
import { TYPING_WAIT_OFFSET } from '../../../constants/app';
import { chat as chatLabels, display } from '../../../constants/labels';

const ChatArea = (props: any): any => {
  const { messages, onSend, socket, censor = false, active = true } = props;

  const [text, setText] = useState('');

  const [chatGuide, setChatGuide] = useState(getRandomChatGuide());
  const [error, setError] = useState<any>(null);
  const [showError, setShowError] = useState<any>(false);

  const [typingUsers, setTypingUsers] = useState<any>([]);

  useEffect(() => {
    socket.on(events.TYPING, (userObj: any) => {
      const user = typingUsers.find((user: any) => user.id === userObj.id);

      if (!user) {
        setTypingUsers([...typingUsers, userObj]);
      }
    });

    socket.on(events.STOP_TYPING, (userObj: any) => {
      setTypingUsers(typingUsers.filter((user: any) => user.id !== userObj.id));
    });

    return (): void => {
      socket.off(events.TYPING);
      socket.off(events.STOP_TYPING);
    };
  }, [typingUsers]);

  const validate = (): boolean => {
    let isValid = false;
    if (!text || /^\s*$/.test(text)) {
      setError(chatLabels.tooShort);
    } else if (text.length > 200) {
      setError(chatLabels.tooLong);
    } else {
      setError(null);
      isValid = true;
    }

    return isValid;
  };

  const handleTextChange = (event: any): void => {
    setShowError(false);
    setText(event.target.value);
    validate();
  };

  useEffect((): any => {
    if (messages.length % 5 === 0) {
      setChatGuide(getRandomChatGuide([chatGuide]));
    }
  }, [messages.length]);

  const [mode, setMode] = useState(1);

  const handleModeToggle = (event: any, newMode: number): void => {
    setMode(newMode);
  };

  const handleSendClick = (): void => {
    const isFormValid = validate();
    if (!isFormValid) {
      setShowError(true);
    } else {
      onSend(
        text,
        () => {
          setText('');
        },
        mode === 2
      );

      socket.emit(events.STOP_TYPING);
    }
  };

  const handleGifSelect = (obj: any): void => {
    onSend(obj.media[0].tinygif.url, null, false, mode === 3);
    setMode(1);
  };

  const startTyping = useCallback(
    debounce(
      () => {
        socket.emit(events.TYPING);
      },
      TYPING_WAIT_OFFSET,
      true
    ),
    [socket]
  );

  const stopTyping = useCallback(
    debounce(
      () => {
        socket.emit(events.STOP_TYPING);
      },
      TYPING_WAIT_OFFSET,
      false
    ),
    [socket]
  );

  const handleKeyDown = (event: any): void => {
    if (event.key === 'Enter') {
      handleSendClick();
    }
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      startTyping();
    }
  };

  const handleKeyUp = (event: any): void => {
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      stopTyping();
    }
  };

  const typingText = useMemo(
    () =>
      typingUsers.length
        ? typingUsers.length >= 4
          ? display.SEVERAL_PEOPLE_TYPING
          : `${listToString(typingUsers, 'nickname')} ${
              typingUsers.length === 1 ? 'is' : 'are'
            } typing...`
        : null,
    [typingUsers]
  );

  return (
    <div>
      <Messages items={messages} extended={!active} censor={censor} />
      {active && (
        <Grid container style={{ padding: '20px' }} spacing={2}>
          <Grid
            item
            xs={12}
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                position: 'relative',
                left: '12px',
                top: '36px',
              }}
            >
              <Typography variant="subtitle2">{typingText || ' '} </Typography>
            </div>
            <div>
              {mode === 3 && (
                <Paper
                  style={{
                    position: 'absolute',
                    bottom: '0px',
                    height: '492px',
                    right: '0px',
                    width: '480px',
                    display: 'inline-block',
                  }}
                >
                  <Tenor
                    autoFocus={true}
                    token={config.app.tenorApiKey}
                    onSelect={handleGifSelect}
                  />
                </Paper>
              )}
              <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={handleModeToggle}
                aria-label="text alignment"
              >
                <ToggleButton value={1} aria-label="left aligned">
                  {'TEXT'}
                </ToggleButton>
                <ToggleButton value={2} aria-label="centered">
                  {'MD'}
                </ToggleButton>
                <ToggleButton value={3} aria-label="right aligned">
                  {'GIF'}
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </Grid>
          <Grid item xs={11}>
            <TextField
              id="outlined-basic-email"
              variant="filled"
              label={chatGuide}
              error={showError}
              helperText={showError && error}
              value={text}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              fullWidth
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="outlined"
              color="primary"
              disabled={showError}
              style={{ height: '100%' }}
              onClick={handleSendClick}
            >
              <SendIcon />
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default ChatArea;
