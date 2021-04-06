import React from 'react';

import { Typography, Button, Tooltip } from '@material-ui/core';
import { getRandomLoadingGif } from '../../../utils/image';

const Matching = (props: any): any => {
  const { onStop } = props;
  return (
    <div style={{ width: '100%', textAlign: 'center', marginTop: '16px' }}>
      <img src={getRandomLoadingGif()} height={400} alt={'waiting'} />{' '}
      <Typography variant="h2" color="textPrimary">
        {'We are searching a cool person for you!'}
      </Typography>
      <Tooltip
        title="If it's taking too long, do consider adding more interests or brewing a nice cup of coffee!"
        aria-label="add"
      >
        <Typography
          variant="h6"
          color="textPrimary"
          style={{ marginTop: '8px', marginBottom: '16px' }}
        >
          {'It might take a while, so sit back and do some stretches!'}
        </Typography>
      </Tooltip>
      <div>
        <Button
          variant="outlined"
          onClick={onStop}
          color="secondary"
          style={{ marginTop: '8px' }}
        >
          {'Nevermind, Take me back'}
        </Button>
      </div>
    </div>
  );
};

export default Matching;
