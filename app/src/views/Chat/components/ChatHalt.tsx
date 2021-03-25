import React from 'react';

import { Typography, Button } from '@material-ui/core';

const ChatHalt = (props: any): any => {
  const { onRematch, onBackClick } = props;
  return (
    <>
      {' '}
      <Typography variant="h5" color="primary">
        {'Oof, they left'}
      </Typography>
      <Button variant="outlined" onClick={onRematch} color="primary">
        {"We're just getting started, Find me another"}
      </Button>
      <Button variant="outlined" onClick={onBackClick} color="primary">
        {"I'm done, take me out"}
      </Button>
    </>
  );
};

export default ChatHalt;
