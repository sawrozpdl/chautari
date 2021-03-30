import React from 'react';

import { Typography } from '@material-ui/core';

import { interests } from '../../../constants/labels';
import { PaperCheckbox, ItemsSelect } from '../../../components';

const Interests = (props: any): any => {
  const { formState, onChange } = props;
  return (
    <>
      {' '}
      <Typography variant="h4" color="textPrimary">
        {'Interests'}
      </Typography>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        style={{ marginBottom: '24px' }}
      >
        {
          'If turned on, you will be matched with people sharing similar interests.'
        }
      </Typography>
      <ItemsSelect
        label={'interest'}
        name={'interests'}
        labels={interests}
        value={formState.interests}
        onChange={onChange}
      />
      <PaperCheckbox
        name={'interestMatching'}
        title={'Activate interest based matching'}
        description={'Match with people based on the above interests.'}
        checked={formState.interestMatching}
        onChange={onChange}
      />
    </>
  );
};

export default Interests;
