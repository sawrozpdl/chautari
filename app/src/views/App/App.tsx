import React from 'react';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';
import routes from '../../constants/routes';

const App: React.FC<any> = (props: any) => {
  const { className, history, socket, ...rest } = props;
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

  const handleRandomChatClick = (): void => {
    history.push(routes.RANDOM_CHAT);
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={12} xs={12}>
            <Typography variant="h1">{'App page!'}</Typography>
            <Button
              variant="outlined"
              onClick={handleRandomChatClick}
              color="primary"
            >
              Random
            </Button>
          </Grid>
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