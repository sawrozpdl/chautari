import React from 'react';
import moment from 'moment';

import { ListItem, Grid, ListItemText, Typography } from '@material-ui/core';

import Markdown from '../../../components/Markdown';

const Message = (props: any): any => {
  const { data, user, isFromSelf = true, time, isMd } = props;
  return (
    <ListItem>
      <Grid container style={{ textAlign: isFromSelf ? 'right' : 'left' }}>
        {!isFromSelf && (
          <Grid item xs={12} style={{ marginBottom: '-8px' }}>
            <ListItemText
              secondary={
                <Typography variant="caption" color={'primary'}>
                  {user}
                </Typography>
              }
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <ListItemText
            primary={
              <Typography variant="h3">
                {' '}
                {isMd ? <Markdown text={data} /> : data}
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12} style={{ marginTop: '-8px' }}>
          <ListItemText
            secondary={
              <Typography variant="caption">
                {' '}
                {moment(time).calendar()}
              </Typography>
            }
          />
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default Message;
