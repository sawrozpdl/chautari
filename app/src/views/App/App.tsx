import React, { useCallback } from 'react';

import PropTypes from 'prop-types';
import {
  Container,
  Grid,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core';
import toast from '../../utils/toast';
import GroupIcon from '@material-ui/icons/Group';
import PublicIcon from '@material-ui/icons/Public';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';

import ChipButton from '../../components/ChipButton';
import routes, { options } from '../../constants/routes';
import { interpolate, parseQuery } from '../../utils/string';

const App: React.FC<any> = (props: any) => {
  const { history, settings, socket } = props;
  const useStyles = makeStyles((theme: any) => ({
    root: {
      paddingTop: 100,
      minHeight: '100vh',
      paddingBottom: 200,
      [theme.breakpoints.down('md')]: {
        paddingTop: 60,
        paddingBottom: 60,
      },
    },
    content: {
      position: 'relative',
    },
    paperBtn: {
      padding: '16px',
      cursor: 'pointer',
      opacity: '.9',
      '&:hover': {
        opacity: '1',
      },
    },
    btnInfo: {
      position: 'relative',
      bottom: ' 12px',
      left: '6px',
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
    backBtn: {
      position: 'absolute',
      left: '24px',
      top: '-8px',
      cursor: 'pointer',
      '&:hover': {
        transform: 'scale(1.1)',
        transition: '0.2s ease',
      },
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
    btnGroup: {
      textAlign: 'center',
      marginTop: theme.spacing(4),
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

  const getQuery = useCallback(() => parseQuery(props.location.search), [
    props.location.search,
  ]);

  const { room } = getQuery();

  const isRoomMode = Boolean(room);

  const handleRandomChatClick = (): void => {
    if (!socket.connected) {
      return toast.info('Unable to connect, Please try again later!');
    }
    history.push(routes.RANDOM_CHAT);
  };

  const handleCreateRoomClick = (): void => {
    history.push(interpolate(routes.ROOM_EDIT, { option: options.CREATE }));
  };

  const handleJoinRoomClick = (): void => {
    history.push(interpolate(routes.ROOM_EDIT, { option: options.JOIN }));
  };

  const handleBrowseRoomClick = (): void => {
    history.push(routes.ROOM_LIST);
  };

  const handleBackClick = (): void => {
    history.push({
      pathname: routes.APP,
      search: '',
    });
  };

  const handleRoomClick = (): void => {
    history.push({
      pathname: routes.APP,
      search: '?room=true',
    });
  };

  return (
    <Container component="main" maxWidth="sm" className={classes.root}>
      <div className={classes.content}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h1">
            {isRoomMode ? 'Socializing time?' : `Hey ${settings.nickname} !`}
          </Typography>
        </div>
        <div className={classes.paper}>
          <Typography component="h4" variant="h4" color={'primary'}>
            {isRoomMode
              ? 'Quite an extrovert you are!'
              : 'Choose a chatting mode to continue'}
          </Typography>
        </div>
        {isRoomMode && (
          <ArrowBackIcon
            onClick={handleBackClick}
            className={classes.backBtn}
            color="inherit"
          />
        )}
        <Grid container spacing={4} className={classes.btnGroup}>
          {isRoomMode ? (
            <>
              <Grid item lg={6} xs={12}>
                <ChipButton
                  icon={AddCircleIcon}
                  label={'Create Room'}
                  onClick={handleCreateRoomClick}
                  disabled={true} //TODO
                  info="Create a new room and invite other people."
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <ChipButton
                  icon={MeetingRoomIcon}
                  label={'Join Room'}
                  onClick={handleJoinRoomClick}
                  disabled={true} //TODO
                  info="Join a created room"
                />
              </Grid>
              <Grid item lg={12} xs={12}>
                <Divider variant="middle" />
              </Grid>
              <Grid item lg={12} xs={12}>
                <ChipButton
                  icon={PublicIcon}
                  label={'Browse public rooms'}
                  onClick={handleBrowseRoomClick}
                  disabled={true} //TODO
                  info="Join public rooms created by other people"
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item lg={6} xs={12}>
                <ChipButton
                  icon={AllInclusiveIcon}
                  label={'Random Match'}
                  onClick={handleRandomChatClick}
                  info="Match with random people on the web"
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <ChipButton
                  icon={GroupIcon}
                  label={'Chat Rooms'}
                  onClick={handleRoomClick}
                  info="Create or Join a room and chat with multiple people/invite someone as well"
                />
              </Grid>
            </>
          )}
        </Grid>
      </div>
    </Container>
  );
};

App.propTypes = {
  className: PropTypes.string,
  user: PropTypes.any,
  match: PropTypes.any,
};

export default App;
