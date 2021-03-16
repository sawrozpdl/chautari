import clsx from 'clsx';
import PropTypes from 'prop-types';
import { io } from 'socket.io-client';
import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Paper,
  Input,
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { get } from '../../utils/storage';
import UserContext from '../../context/UserContext';
import { API_BASE_URL } from '../../constants/endpoints';
import {
  MAX_RECONNECTION_ATTEMPTS,
  MAX_RECONNECTION_DELAY,
} from '../../constants/socket';

const socket = io(API_BASE_URL, {
  transports: ['websocket'],
  reconnectionAttempts: MAX_RECONNECTION_ATTEMPTS,
  reconnectionDelayMax: MAX_RECONNECTION_DELAY,
  auth: {
    token: get('accessToken'),
  },
  query: {
    ref: 'native',
  },
});

const ID = Math.round(Math.random() * 1000);

const App: React.FC<any> = (props: any) => {
  const { className, history, ...rest } = props;
  const useStyles = makeStyles((theme: any) => ({
    root: {
      paddingTop: 200,
      minHeight: '100vh',
      paddingBottom: 200,
      [theme.breakpoints.down('md')]: {
        paddingTop: 60,
        paddingBottom: 60,
      },
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: '4px',
      padding: theme.spacing(1),
      flexBasis: 420,
    },
    search: {
      marginLeft: theme.spacing(1),
      color: theme.palette.text.secondary,
      cursor: 'pointer',
    },
    input: {
      flexGrow: 1,
      fontSize: '14px',
      lineHeight: '16px',
      letterSpacing: '-0.05px',
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

  const userCtx: any = useContext(UserContext);
  const { user } = userCtx;

  const [messages, setMessages] = useState<Array<any>>([]);

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages((messages) => [...messages, data]);
    });
  }, []);

  const [input, setInput] = useState('');

  const handleMessageSend = () => {
    socket.emit('sendMessage', {
      user: `${user.firstName}#${ID}`,
      data: input,
    });
    setInput('');
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={12} xs={12}>
            {messages.map((message, index) => (
              <Typography
                variant="h5"
                key={index}
              >{`${message.user}: ${message.data}!`}</Typography>
            ))}
          </Grid>
          <Paper {...rest} className={clsx(classes.paper, className)}>
            <Input
              {...rest}
              className={classes.input}
              placeholder={'Jot down your message!'}
              disableUnderline
              value={input}
              onChange={(e): any => setInput(e.target.value)}
            />
            <ArrowForwardIcon
              className={classes.search}
              onClick={handleMessageSend}
            />
          </Paper>
        </Grid>
      </Container>
    </div>
  );
};

App.propTypes = {
  className: PropTypes.string,
  user: PropTypes.any,
  match: PropTypes.any,
};

export default App;
