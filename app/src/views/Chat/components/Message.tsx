import React from 'react';
import moment from 'moment';

import { ListItem, Grid, ListItemText, Typography } from '@material-ui/core';

import Markdown from '../../../components/Markdown';

const Info = (props: any): any => {
  const { time, data } = props;

  return (
    <div
      style={{
        width: '100%',
        textAlign: 'center',
        marginTop: '16px',
        marginBottom: '16px',
      }}
    >
      <Typography
        variant="h4"
        color="textPrimary"
        style={{ marginBottom: '4px' }}
      >
        <Markdown text={data} />
      </Typography>
      {time && (
        <Typography variant="caption"> {moment(time).calendar()}</Typography>
      )}
    </div>
  );
};

const Message = (props: any): any => {
  const {
    data,
    user,
    isFromSelf = true,
    color,
    time,
    showTime = true,
    isMd,
    isInfo,
    component: Component,
    ...rest
  } = props;
  return (
    <ListItem>
      {Component ? (
        <Component {...rest} />
      ) : isInfo ? (
        <Info data={data} time={time} />
      ) : (
        <Grid container style={{ textAlign: isFromSelf ? 'right' : 'left' }}>
          {!isFromSelf && (
            <Grid item xs={12} style={{ marginBottom: '-8px' }}>
              <ListItemText
                secondary={
                  <Typography
                    variant="caption"
                    color={'primary'}
                    style={color && { color }}
                  >
                    {user}
                  </Typography>
                }
              />
            </Grid>
          )}
          <Grid item xs={12} style={showTime ? {} : { marginBottom: '-16px' }}>
            <ListItemText
              primary={
                <Typography variant="h3">
                  {' '}
                  {isMd ? <Markdown text={data} /> : data}
                </Typography>
              }
            />
          </Grid>
          {time && showTime && (
            <Grid
              item
              xs={12}
              style={{ marginTop: '-8px', marginBottom: '-2px' }}
            >
              <ListItemText
                secondary={
                  <Typography variant="caption">
                    {' '}
                    {moment(time).calendar()}
                  </Typography>
                }
              />
            </Grid>
          )}
        </Grid>
      )}
    </ListItem>
  );
};

export default Message;
