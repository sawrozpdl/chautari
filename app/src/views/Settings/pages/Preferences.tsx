import React from 'react';

import { Typography, Link } from '@material-ui/core';

import routes from '../../../constants/routes';
import { PaperCheckbox, SlideSelect } from '../../../components';

const Preferences = (props: any): any => {
  const { formState, onChange, history, user } = props;

  const isRegistered = Boolean(user.id);
  const isAgeVerified = Boolean(user.ageGroup);

  const handleVerifyClick = (): void => {
    history.push(routes.VERIFY);
  };

  return (
    <>
      {' '}
      <Typography variant="h4" color="textPrimary">
        {'Preferences'}
      </Typography>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        style={{ marginBottom: '24px' }}
      >
        {'Settings based on user experiences/specific preferences.'}
      </Typography>
      <PaperCheckbox
        name={'safeMode'}
        title={'Keep me safe'}
        description={
          'Hide profanity, offensive languages and other racial slurs from people around the world.'
        }
        checked={formState.safeMode}
        onChange={onChange}
      />
      <PaperCheckbox
        name={'ageGroupMatching'}
        title={'Match me with similar age group'}
        description={
          isAgeVerified ? (
            'Turning this on will match you with people around the same age group as you.'
          ) : (
            <>
              {'You need to be age verified to enable this feature. '}
              {'Click '}
              <Link
                component="button"
                variant="body2"
                onClick={handleVerifyClick}
              >
                {'here'}
              </Link>
              {' to quick verify your age!'}
            </>
          )
        }
        checked={formState.ageGroupMatching}
        disabled={!isAgeVerified}
        onChange={onChange}
      />
      <PaperCheckbox
        name={'locationMatching'}
        title={'Match me with people around my area'}
        description={
          isRegistered
            ? 'Turning this on will use your location info for matching with likewise located people.'
            : 'You need to be a registered user with location set on your profile to use this feature!'
        }
        checked={formState.locationMatching}
        disabled={!isRegistered}
        onChange={onChange}
      />
      <SlideSelect
        name={'matchTimeout'}
        title={'Match wait timeout: (in seconds)'}
        description={'Set it to 0 if you want to disable the timeout feature.'}
        onChange={onChange}
        max={500}
        value={formState.matchTimeout}
      />
    </>
  );
};

export default Preferences;
