import React from 'react';

import { Grid, Slider, Input, Paper, Box, Typography } from '@material-ui/core';

const paperProps = {
  style: {
    cursor: 'pointer',
    marginTop: '24px',
  },
  p: 2,
  mb: 2,
};

const SlideSelect = (props: any): any => {
  const {
    name,
    onChange,
    title,
    className,
    usePaper = true,
    description,
    value,
    min = 0,
    max = 10,
    step = 10,
  } = props;

  const handleSliderChange = (_: any, newValue: any): void => {
    onChange(name, newValue);
  };

  const handleInputChange = (event: any): void => {
    onChange(name, Number(event.target.value || 0));
  };

  const handleBlur = (): void => {
    if (value < min) {
      onChange(name, min);
    } else if (value > max) {
      onChange(name, max);
    }
  };

  const renderSelect = (): any => (
    <>
      <Box mb={2}>
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
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            min={min}
            max={max}
            value={typeof value === 'number' ? value : min}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step,
              min,
              max,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </>
  );

  return usePaper ? (
    <Paper
      className={className}
      {...paperProps}
      component={Box}
      elevation={Math.round((10 * value) / (max - min))}
    >
      {renderSelect()}
    </Paper>
  ) : (
    <div className={className}>{renderSelect()}</div>
  );
};

export default SlideSelect;
