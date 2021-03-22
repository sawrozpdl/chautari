import React from 'react';
import moment from 'moment';

import { ListItem, Grid, ListItemText, Typography } from '@material-ui/core';
import Markdown from '../../../components/Markdown';

const Message = (props: any): any => {
  const { data, user, isFromSelf = true, time, isMd } = props;
  return (
    <ListItem>
      <Grid container justify={isFromSelf ? 'flex-start' : 'flex-end'}>
        <Grid item xs={12}>
          <ListItemText
            secondary={<Typography variant="caption">{user}</Typography>}
          />
        </Grid>
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
        <Grid item xs={12}>
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
