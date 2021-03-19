import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import routes from '../../constants/routes';
import { Container, Grid, Typography, makeStyles } from '@material-ui/core';

const Home: React.FC<any> = (props: any) => {
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
    brand: {
      textAlign: 'center',
      '& h1': {
        fontSize: '4.2rem',
        fontWeight: '600',
        display: 'inline-block',
        position: 'relative',
      },
    },
    extraInfo: {
      position: 'relative',
      fontSize: '22px',
      textTransform: 'uppercase',
      right: '-15px',
      padding: '5px 9px',
      top: '-30px',
      background: theme.palette.primary.main,
      borderRadius: '3px',
      color: theme.palette.background.dark,
      lineHeight: '22px',
    },
    title: {
      color: theme.palette.info.main,
      textDecoration: 'none',
      marginTop: '15px',
      marginBottom: '25px',
      minHeight: '32px',
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
    actionArea: {
      margin: 'auto',
      marginTop: theme.spacing(2),
      textAlign: 'center',
    },
  }));

  const classes: any = useStyles();

  const handleAppLaunch = (): void => {
    history.push(routes.APP);
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={12} xs={12}>
            <div className={classes.brand}>
              <Typography variant="h1">{'Chautari'}</Typography>
              <span className={classes.extraInfo}>{'0.1'}</span>
              <h2 className={classes.title}>
                {'A perfect place to chat with people all over the world'}
              </h2>
            </div>
          </Grid>
          <Grid item lg={6} xs={12} className={classes.actionArea}>
            <Button
              variant="outlined"
              onClick={handleAppLaunch}
              color="secondary"
            >
              Launch app
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

Home.propTypes = {
  className: PropTypes.string,
  user: PropTypes.any,
  match: PropTypes.any,
};

export default Home;
