import React, { useRef, useState, useCallback } from 'react';

import clsx from 'clsx';
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  makeStyles,
} from '@material-ui/core';
import Webcam from 'react-webcam';
import ReplayIcon from '@material-ui/icons/Replay';
import CameraIcon from '@material-ui/icons/Camera';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const SelfieCam = (props: any): any => {
  const webcamRef: any = useRef(null);
  const [imgSrc, setImgSrc] = useState(undefined);

  const useStyles = makeStyles(() => ({
    card: {
      marginTop: '20px',
    },
    cardContent: {
      minHeight: '500px',
      overflowY: 'scroll',
      display: 'flex',
      justifyContent: 'space-around',
    },
    actions: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    capture: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    iconButton: {
      padding: '8px',
    },
    filterArea: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }));

  const classes: any = useStyles();

  const {
    onProcess,
    onExit,
    onRetry,
    isProcessing,
    labels,
    error,
    className,
  } = props;

  const {
    exit = 'Exit',
    title = 'Selfie',
    description = 'Click capture to proceed!',
    use = 'Use',
    capture = 'Capture',
    retry = 'Retry',
  } = labels;

  const takePicture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const handleRetake = (): void => {
    setImgSrc(undefined);
    onRetry();
  };

  return (
    <Card className={clsx(classes.card, className)}>
      <CardHeader
        subtitle={description}
        title={title}
        action={
          <Button
            color="secondary"
            size="small"
            variant="outlined"
            onClick={onExit}
          >
            {exit}
          </Button>
        }
      />
      <Divider />
      <CardContent className={classes.cardContent}>
        {imgSrc ? (
          <img src={imgSrc} />
        ) : (
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        )}
      </CardContent>
      <CardActions className={imgSrc ? classes.actions : classes.capture}>
        {!imgSrc ? (
          <>
            <Button
              color="primary"
              size="small"
              variant="text"
              onClick={takePicture}
              startIcon={<CameraIcon />}
            >
              {capture}
            </Button>
          </>
        ) : (
          <>
            <Button
              color="primary"
              size="small"
              variant="text"
              disabled={isProcessing}
              onClick={handleRetake}
            >
              <ReplayIcon /> {retry}
            </Button>
            {error && (
              <Typography variant="body2" color={'error'}>
                {error}{' '}
              </Typography>
            )}
            <Button
              color="primary"
              size="small"
              variant="text"
              disabled={isProcessing}
              onClick={(): void => onProcess(imgSrc)}
            >
              {use} <ArrowRightIcon />
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default SelfieCam;
