import React, { useEffect, useState } from 'react';

import SendIcon from '@material-ui/icons/Send';
import { Button, Grid, TextField } from '@material-ui/core';
import { chat as chatLabels } from '../../../constants/labels';

import Messages from './Messages';
import { getRandomChatGuide } from '../../../utils/chat';

const ChatArea = (props: any): any => {
  const { messages, onSend, active = true } = props;

  const [text, setText] = useState('');

  const [chatGuide, setChatGuide] = useState(getRandomChatGuide());
  const [error, setError] = useState<any>(null);
  const [showError, setShowError] = useState<any>(false);

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
    }
  };

  const handleKeyDown = (event: any): void => {
    if (event.key === 'Enter') {
      handleSendClick();
    }
  };

  return (
    <div>
      <Messages items={messages} extended={!active} />
      {active && (
        <Grid container style={{ padding: '20px' }} spacing={2}>
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
