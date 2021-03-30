import React from 'react';

import { Button, Typography } from '@material-ui/core';

const ActionBar = (props: any): any => {
  const { onBackClick, changed, onUpdateClick } = props;

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '24px',
      }}
    >
      <Button variant="outlined" onClick={onBackClick} color="secondary">
        Exit
      </Button>
      {changed && (
        <Typography variant="subtitle1" color="textSecondary">
          {'You have unsaved changes!'}
        </Typography>
      )}
      <Button
        variant="outlined"
        onClick={onUpdateClick}
        disabled={!changed}
        color={changed ? 'primary' : 'default'}
      >
        Save
      </Button>
    </div>
  );
};

export default ActionBar;
