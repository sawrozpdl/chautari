import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: any) => ({
  root: {
    padding: theme.spacing(6),
    minHeight: '100vh',
  },
  content: {
    paddingTop: 50,
    textAlign: 'center',
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560,
  },
  sub: {
    marginTop: 20,
  },
}));

const NotFound = (props: any) => {
  const classes = useStyles();

  const { history } = props;

  const handleBackClick = () => {
    history.goBack();
  };

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={6} xs={12}>
          <Button variant="outlined" onClick={handleBackClick} color="primary">
            Back
          </Button>
        </Grid>
        <Grid item lg={12} xs={12}>
          <div className={classes.content}>
            <Typography variant="h1">Not found</Typography>
            <Typography variant="h5" className={classes.sub}>
              The content you are looking for doesn't exist or has been moved
              elsewhere.
            </Typography>
            <img
              alt="Not found"
              height={400}
              width={400}
              className={classes.image}
              src="/images/error-404.svg"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;
