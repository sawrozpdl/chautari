import React, { useEffect, useState } from 'react';

import SendIcon from '@material-ui/icons/Send';
import { Button, Grid, TextField } from '@material-ui/core';

import Messages from './Messages';
import { getRandomChatGuide } from '../../../utils/chat';

const ChatArea = (props: any): any => {
  const { messages, onSend } = props;

  const [text, setText] = useState('');

  const [chatGuide, setChatGuide] = useState(getRandomChatGuide());

  const handleSendClick = (): void => {
    onSend(text, () => {
      setText('');
    });
  };

  const handleTextChange = (event: any): void => {
    setText(event.target.value);
  };

  useEffect((): any => {
    if (messages.length % 5 === 0) {
      setChatGuide(getRandomChatGuide([chatGuide]));
    }
  }, [messages.length]);

  return (
    <>
      <Messages items={messages} />
      <Grid container style={{ padding: '20px' }} spacing={2}>
        <Grid item xs={11}>
          <TextField
            id="outlined-basic-email"
            variant="filled"
            label={chatGuide}
            value={text}
            onChange={handleTextChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            variant="outlined"
            color="primary"
            style={{ height: '100%' }}
            onClick={handleSendClick}
          >
            <SendIcon />
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ChatArea;
