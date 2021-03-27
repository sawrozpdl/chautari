import React from 'react';

import { List } from '@material-ui/core';

import Message from './Message';

const Messages = (props: any): any => {
  const { items, className, extended } = props;
  return (
    <List
      className={className}
      style={{ height: extended ? '100vh' : '75vh', overflowY: 'auto' }}
    >
      {items.map((item: any, index: number) => (
        <Message key={index} {...item} />
      ))}
    </List>
  );
};

export default Messages;
