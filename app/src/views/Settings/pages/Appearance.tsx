import React from 'react';

import { Typography } from '@material-ui/core';

import { RadioSelect } from '../../../components';
import { themeOptions } from '../../../constants/themes';

const Appearance = (props: any): any => {
  const { formState, onChange } = props;
  return (
    <>
      {' '}
      <Typography variant="h4" color="textPrimary">
        {'Appearance'}
      </Typography>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        style={{ marginBottom: '24px' }}
      >
        {'These settings determine the overall look/palette of this app.'}
      </Typography>
      <RadioSelect
        name={'theme'}
        value={formState.theme}
        onChange={onChange}
        options={themeOptions}
      />
    </>
  );
};

export default Appearance;
