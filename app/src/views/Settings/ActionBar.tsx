import React from 'react';

import { Button, Typography } from '@material-ui/core';

const ActionBar = (props: any): any => {
  const { onBackClick, changed, onUpdateClick, onResetClick } = props;

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '24px',
      }}
    >
      <div>
        <Button variant="outlined" onClick={onBackClick} color="secondary">
          Exit
        </Button>
        {changed && (
          <Typography
            variant="subtitle1"
            color="textSecondary"
            style={{ marginLeft: '12px', display: 'inline-block' }}
          >
            {'You have unsaved changes !'}
          </Typography>
        )}
      </div>
      <div>
        {changed && (
          <Button
            variant="outlined"
            onClick={onResetClick}
            color={'default'}
            style={{ marginLeft: '12px', marginRight: '12px' }}
          >
            Reset
          </Button>
        )}
        <Button
          variant="outlined"
          onClick={onUpdateClick}
          disabled={!changed}
          color={'primary'}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default ActionBar;
