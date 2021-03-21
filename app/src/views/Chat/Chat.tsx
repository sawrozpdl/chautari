import React, { useState, useEffect } from 'react';

import { Button, Paper, Input } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Container, Grid, Typography, makeStyles } from '@material-ui/core';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import { events } from '../../constants/socket';

const Chat: React.FC<any> = (props: any) => {
  const { className, history, socket, settings, ...rest } = props;
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

  useEffect(() => {
    socket.on(events.MESSAGE, (data: any) => {
      setMessages((messages) => [...messages, data]);
    });

    return (): void => {
      socket.on(events.MESSAGE, null);
    };
  }, []);

  const [input, setInput] = useState('');

  const handleMessageSend = (): void => {
    socket.emit(events.SEND_MESSAGE, {
      user: settings.nickname,
      data: input,
    });
    setInput('');
  };

  const handleBackClick = (): void => {
    history.goBack();
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

Chat.propTypes = {
  className: PropTypes.string,
  user: PropTypes.any,
  match: PropTypes.any,
};

export default Chat;
