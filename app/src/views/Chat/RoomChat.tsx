import React, { useState, useEffect } from 'react';

import { Button, Paper, Input } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Container, Grid, Typography, makeStyles } from '@material-ui/core';

import PropTypes from 'prop-types';
import { ChatArea } from './components';
import { events } from '../../constants/socket';

const RoomChat: React.FC<any> = (props: any) => {
  const { className, history, socket, settings, ...rest } = props;
  const useStyles = makeStyles((theme: any) => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '70%',
      marginTop: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
    },
    signUpButton: {
      margin: theme.spacing(2, 0),
    },
    textField: {
      marginTop: theme.spacing(2),
    },
    typoSend: {
      marginTop: theme.spacing(1),
    },
    image: {
      perspectiveOrigin: 'left center',
      transformStyle: 'preserve-3d',
      perspective: 1500,
      '& > img': {
        maxWidth: '90%',
        height: 'auto',
        transform: 'rotateY(-35deg) rotateX(15deg)',
        backfaceVisibility: 'hidden',
        boxShadow: theme.shadows[16],
      },
    },
    shape: {
      position: 'absolute',
      top: 0,
      left: 0,
      '& > img': {
        maxWidth: '90%',
        height: 'auto',
      },
    },
  }));

  const classes: any = useStyles();

  const [messages, setMessages] = useState<Array<any>>([]);

  const handleBackClick = (): void => {
    history.goBack();
  };

  return (
    <div className={className} {...rest}>
      <Container maxWidth="md">
        <Grid container style={{ height: '80vh', marginTop: '24px' }}>
          <Button
            variant="outlined"
            onClick={handleBackClick}
            className={classes.backBtn}
            color="primary"
          >
            Back
          </Button>
        </Grid>
      </Container>
    </div>
  );
};

RoomChat.propTypes = {
  className: PropTypes.string,
  user: PropTypes.any,
  match: PropTypes.any,
};

export default RoomChat;
