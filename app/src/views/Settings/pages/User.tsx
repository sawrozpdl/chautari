import React, { useCallback } from 'react';

import { SliderPicker } from 'react-color';
import { Typography, Paper } from '@material-ui/core';

import { NamePicker } from '../../../components';
import { getInverseColor } from '../../../utils/string';

const User = (props: any): any => {
  const { formState, onChange } = props;

  const getBackground = useCallback((): string => {
    return getInverseColor(formState.color, {
      black: '#282C34',
      white: '#fff',
    });
  }, [formState.color]);

  return (
    <>
      {' '}
      <Typography variant="h4" color="textPrimary">
        {'Profile Settings'}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        {'These settings determine the visible info of the user.'}
      </Typography>
      <Typography
        variant="h5"
        color="textSecondary"
        style={{ marginBottom: '24px', marginTop: '24px' }}
      >
        {'Name Appearance:'}
      </Typography>
      <Paper
        style={{
          background: getBackground(),
          textAlign: 'center',
          width: '50%',
          margin: 'auto',
          transition: '0.2s ease-in',
          marginBottom: '24px',
        }}
      >
        <Typography
          variant="h4"
          color="textPrimary"
          style={{
            marginTop: '16px',
            color: formState.color,
            padding: '12px',
            transition: '0.2s ease-out',
          }}
        >
          {formState.nickname}
        </Typography>
      </Paper>
      <NamePicker
        name={'nickname'}
        value={formState.nickname}
        onChange={onChange}
        label={'Having second thoughts on your nickname?'}
        helperText={'Here, we got you covered ;)'}
      />
      <Typography
        variant="h5"
        color="textSecondary"
        style={{ marginTop: '24px', marginBottom: '24px' }}
      >
        {'Choose a color that suits your taste.'}
      </Typography>
      <SliderPicker
        color={formState.color}
        onChangeComplete={(color: any): void => onChange('color', color.hex)}
      />
    </>
  );
};

export default User;
