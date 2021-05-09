import React from 'react';

import { List } from '@material-ui/core';

import Message from './Message';
import { MESSAGE_TIME_DISPLAY_OFFSET } from '../../../constants/app';

const Messages = (props: any): any => {
  const { items, className, extended, censor } = props;

  let shownTime = 0;

  const shouldShowTime = (time: number): boolean => {
    if (time - shownTime > MESSAGE_TIME_DISPLAY_OFFSET) {
      shownTime = time;
      return true;
    }

    return false;
  };

  return (
    <List
      className={className}
      style={{ height: extended ? '100vh' : '72vh', overflowY: 'auto' }}
    >
      {items.map((message: any, index: number) => (
        <Message
          key={index}
          censor={censor}
          {...message}
          showTime={shouldShowTime(message.time)}
        />
      ))}
    </List>
  );
};

export default Messages;
