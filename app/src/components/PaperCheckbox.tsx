import React from 'react';

import { Paper, Typography, Switch, Box } from '@material-ui/core';

const paperProps = {
  display: 'flex',
  alignItems: 'flex-start',
  style: {
    cursor: 'pointer',
    marginTop: '24px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  p: 2,
  mb: 2,
};

const PaperCheckBox = (props: any): any => {
  const {
    title,
    description,
    onChange,
    disabled = false,
    name,
    checked,
  } = props;
  return (
    <Paper
      {...paperProps}
      component={Box}
      elevation={checked ? 10 : 1}
      onClick={(): void => !disabled && onChange(name, !checked)}
    >
      <Box mr={2}>
        {title && (
          <Typography gutterBottom variant="h5" color="textPrimary">
            {title}
          </Typography>
        )}
        {description && (
          <Typography variant="caption" color="textSecondary">
            {description}
          </Typography>
        )}
      </Box>
      <Switch
        checked={checked}
        size={'medium'}
        name={name}
        disabled={disabled}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    </Paper>
  );
};

export default PaperCheckBox;
