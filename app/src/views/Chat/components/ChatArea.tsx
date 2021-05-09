import React, { useEffect, useMemo, useState, useCallback } from 'react';

import SendIcon from '@material-ui/icons/Send';
import { Button, Grid, TextField, Typography } from '@material-ui/core';

import Messages from './Messages';
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

  const handleSendClick = (): void => {
    const isFormValid = validate();
    if (!isFormValid) {
      setShowError(true);
    } else {
      onSend(text, () => {
        setText('');
      });

      socket.emit(events.STOP_TYPING);
    }
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
              top: '12px',
              left: '12px',
              height: '36px',
            }}
          >
            {typingText && (
              <Typography variant="subtitle2">{typingText} </Typography>
            )}
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
