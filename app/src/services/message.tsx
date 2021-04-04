import { events } from '../constants/socket';

class Messenger {
  socket: any;
  user: string;
  color: string;

  data = '';
  isGif = false;

  isMd = false;
  isInfo = false;
  isFromSelf = false;

  constructor(socket: any, settings: any) {
    this.socket = socket;
    this.user = settings.nickname;
    this.color = settings.color;
  }

  text(msg: string): this {
    this.data = msg;
    this.isGif = false;

    return this;
  }

  md(val = true): this {
    this.isMd = val;

    return this;
  }

  info(val = true): this {
    this.isInfo = val;

    return this;
  }

  self(val = true): this {
    this.isFromSelf = val;

    return this;
  }

  gif(url: string): this {
    this.data = url;
    this.isGif = true;

    return this;
  }

  build(opts: any = {}): any {
    const {
      isInfo = this.isInfo,
      isMd = this.isMd,
      isFromSelf = this.isFromSelf,
    } = opts;

    return {
      user: this.user,
      color: this.color,
      data: this.data,
      isGif: this.isGif,
      time: Date.now(),
      isInfo,
      isMd,
      isFromSelf,
    };
  }

  send(opts: any = {}): this {
    this.socket.emit(events.SEND_MESSAGE, this.build(opts));

    return this;
  }
}

export default Messenger;
