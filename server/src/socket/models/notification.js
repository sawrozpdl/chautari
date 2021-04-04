import IO from '../../socket';
import { events } from '../../constants/socket';
import { messageTypes } from '../../constants/socket';

class Notification {
  constructor(userId) {
    this.userId = userId;

    this.type = messageTypes.INFO;
    this.text = '';
    this.requestId = null;
    this.event = events.PRIVATE_MESSAGE;
  }

  to(userId) {
    this.userId = userId;

    return this;
  }

  saying(text) {
    this.text = text;

    return this;
  }

  as(type) {
    this.type = type;

    return this;
  }

  on(event) {
    this.event = event;

    return this;
  }

  from(requestId) {
    this.requestId = requestId;

    return this;
  }

  switch(params) {
    const keys = Object.keys(params);
    const values = Object.values(params);

    const trueAt = values.indexOf(true);

    if (trueAt === -1) {
      return false;
    } else {
      this.text = keys[trueAt];
      return true;
    }
  }

  send() {
    IO.to(this.userId).emit(this.event, {
      type: this.type,
      text: this.text,
      requestId: this.requestId,
    });
  }
}

export default Notification;
