import React from 'react';

import { List } from '@material-ui/core';

import Message from './Message';

const Messages = (props: any): any => {
  const { items, className } = props;
  return (
    <List className={className} style={{ height: '75vh', overflowY: 'auto' }}>
      {items.map((item: any, index: number) => (
        <Message key={index} {...item} />
      ))}
    </List>
  );
};

export default Messages;
