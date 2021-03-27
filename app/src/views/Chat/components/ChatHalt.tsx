import React from 'react';

import { Typography, Button } from '@material-ui/core';

const ChatHalt = (props: any): any => {
  const { onRematch, onBackClick, bySelf = false } = props;
  return (
    <div style={{ width: '100%', textAlign: 'center', marginTop: '16px' }}>
      {' '}
      <Typography
        variant="h4"
        color="textPrimary"
        style={{ marginBottom: '16px' }}
      >
        {bySelf ? 'You left the chat' : 'Oh no, they left the chat'}
      </Typography>
      <div>
        <Button variant="outlined" onClick={onRematch} color="primary">
          {bySelf
            ? 'tis but a start, Find next match'
            : 'No worries, Keep searching'}
        </Button>
        <Button
          variant="outlined"
          onClick={onBackClick}
          color="secondary"
          style={{ marginLeft: '12px' }}
        >
          {bySelf ? "I'm done, take me out" : 'ESH, take me out'}
        </Button>
      </div>
    </div>
  );
};

export default ChatHalt;
