import React from 'react';

import { Typography, Box, Paper, Radio } from '@material-ui/core';

const paperProps = {
  display: 'flex',
  alignItems: 'flex-start',
  style: { cursor: 'pointer' },
  p: 2,
  mb: 2,
};

const RadioSelect = (props: any): any => {
  const { options, name, value, onChange } = props;

  return (
    <div>
      {options.map((option: any) => (
        <Paper
          {...paperProps}
          component={Box}
          elevation={value === option.value ? 10 : 1}
          key={option.value}
          onClick={(): void => onChange(name, option.value)}
        >
          <Radio checked={value === option.value} />
          <Box ml={2}>
            {option.title && (
              <Typography gutterBottom variant="h5" color="textPrimary">
                {option.title}
              </Typography>
            )}
            {option.description && (
              <Typography variant="body1" color="textSecondary">
                {option.description}
              </Typography>
            )}
          </Box>
        </Paper>
      ))}
    </div>
  );
};

export default RadioSelect;
