import React from 'react';

import { Typography } from '@material-ui/core';

const Matching = (props: any): any => {
  return (
    <>
      {' '}
      <Typography variant="h5" color="primary" className={props.className}>
        {'We have put you in a queue, please wait a while!'}
      </Typography>
    </>
  );
};

export default Matching;
