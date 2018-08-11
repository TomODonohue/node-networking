'use strict';
const EventEmitter = require('events').EventEmitter;
class LDJClient extends EventEmitter {
  constructor(stream) {
    super();
    let buffer = '';
    stream.on('data', data => {
      buffer += data;
      let boundry = buffer.indexOf('\n');
      while(boundry !== -1) {
        const input = buffer.substring(0, boundry);
        buffer = buffer.substring(boundry + 1);
        this.emit('message', JSON.parse(input));
        boundry = buffer.indexOf('\n');
      }
    });
  }

  static connect(stream) {
    return new LDJClient(stream);
  }
}

module.exports = LDJClient;
