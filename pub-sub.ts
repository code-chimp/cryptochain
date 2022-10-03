import { createClient, RedisClientType } from 'redis';

enum Channels {
  Test = 'TEST',
}

class PubSub {
  publisher: RedisClientType;
  subscriber: RedisClientType;

  constructor() {
    this.publisher = createClient();
    this.subscriber = createClient();

    this.publisher.connect();
    this.subscriber.connect().then(() => {
      this.subscriber.subscribe(Channels.Test, (message: string, channel: string) => {
        console.warn(`Message received. Channel: ${channel}\tMessage:${message}`);
      });
    });
  }
}

const testPubSub = new PubSub();

setTimeout(() => testPubSub.publisher.publish(Channels.Test, 'foo'), 1000);
