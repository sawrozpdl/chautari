import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import { Container, Grid, Typography, makeStyles } from '@material-ui/core';

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

  const handleBackClick = (): void => {
    history.goBack();
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={6} xs={12}>
            <Button
              variant="outlined"
              onClick={handleBackClick}
              color="primary"
            >
              Back
            </Button>
          </Grid>
          <Grid item lg={12} xs={12}>
            <Typography variant="h1">{'Settings page!'}</Typography>
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
