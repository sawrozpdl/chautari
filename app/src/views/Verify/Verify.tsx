import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import { Container, makeStyles } from '@material-ui/core';

import alert from '../../utils/alert';
import toast from '../../utils/toast';
import routes from '../../constants/routes';
import { detectAge } from '../../services/ai';
import SelfieCam from '../../components/SelfieCam';
import UserContext from '../../context/UserContext';

const Verify: React.FC<any> = (props: any) => {
  const { history } = props;
  const useStyles = makeStyles(() => ({
    root: {
      height: '100%',
      paddingTop: '40px',
    },
  }));

  const userCtx: any = useContext(UserContext);
  const { user, updateUser } = userCtx;

  const classes: any = useStyles();

  useEffect(() => {
    if (user.ageGroup) {
      history.push(routes.APP);
    }
  }, [user]);

  const handleBackClick = (): void => {
    alert(
      `Confirm skip`,
      `Are you sure you want to skip this verification process as 
      this might put you on the unsafe side of this application`,
      () => {
        history.goBack();

        toast.warning(
          'Please verify you age for secure experience of this app!'
        );
      }
    );
  };

  const [isProcessing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageProcess = async (image: any): Promise<void> => {
    setProcessing(true);

    try {
      const { data } = await detectAge(image);

      if (data.status === 'Success') {
        if (data.result?.length === 1) {
          updateUser({ ageGroup: data.result[0] });
          toast.success('Age verification success!');

          history.push(routes.APP);
        } else {
          setError('There should be only one face vibile on the screen!');
          toast.warning('Many faces detected!');
        }
      } else {
        setError(
          "This image didn't work, Make sure your overall face is visible"
        );
        toast.error('Age verification failed !');
      }
    } catch (_) {
      toast.error('Unknown error occurred!');
    }

    setProcessing(false);
  };

  const handleRetry = (): void => {
    setError(null);
  };

  const handleExit = (): void => {
    handleBackClick();
  };

  return (
    <Container component="main" maxWidth="md" className={classes.root}>
      <div className={classes.content}>
        <Button
          variant="outlined"
          onClick={handleBackClick}
          className={classes.backBtn}
          color="secondary"
        >
          Back
        </Button>
      </div>
      <div>
        <SelfieCam
          isProcessing={isProcessing}
          onProcess={handleImageProcess}
          onExit={handleExit}
          onRetry={handleRetry}
          error={error}
          labels={{ title: 'Age verification', exit: 'Skip', use: 'Proceed' }}
        />
      </div>
    </Container>
  );
};

Verify.propTypes = {
  className: PropTypes.string,
  user: PropTypes.any,
  match: PropTypes.any,
};

export default Verify;
