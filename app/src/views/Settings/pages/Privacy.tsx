import React from 'react';

import { Typography } from '@material-ui/core';

import { PaperCheckbox } from '../../../components';

const Privacy = (props: any): any => {
  const { formState, onChange } = props;
  return (
    <>
      {' '}
      <Typography variant="h4" color="textPrimary">
        {'Privacy'}
      </Typography>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        style={{ marginBottom: '24px' }}
      >
        {'These settings decide how your data/security goes in this app.'}
      </Typography>
      <PaperCheckbox
        name={'privateMode'}
        title={'Keep my profile private'}
        description={'Limit the personal data sent to/fro the server.'}
        checked={formState.privateMode}
        onChange={onChange}
      />
      <PaperCheckbox
        name={'conversationSharing'}
        title={'Let use of my conversations for data science'}
        description={
          "Contribute to data science by allowing use of the conversations made in this site. Note: The conversations won't be made public."
        }
        checked={formState.conversationSharing}
        onChange={onChange}
      />
    </>
  );
};

export default Privacy;
