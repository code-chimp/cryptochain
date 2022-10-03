import { createClient, RedisClientType } from 'redis';
import IBlockchain from '../../@interfaces/IBlockchain';

const Channels: Record<string, string> = {
  Test: 'TEST',
  Blockchain: 'BLOCKCHAIN',
};

export default class PubSub {
  publisher: RedisClientType;
  subscriber: RedisClientType;
  private _blockchain: IBlockchain;

  constructor({ blockchain }: { blockchain: IBlockchain }) {
    this._blockchain = blockchain;
    this.publisher = createClient();
    this.subscriber = createClient();

    this.publisher.connect();
    this.subscriber.connect().then(() => {
      this.subscribeToChannels();
    });
  }

  handleMessage = (message: string, channel: string): void => {
    if (channel === Channels.Blockchain) {
      const chain = JSON.parse(message);

      this._blockchain.replaceChain(chain);
      console.info(chain);
    } else {
      console.warn(`Message received. Channel: ${channel}\tMessage:${message}`);
    }
  };

  subscribeToChannels() {
    Object.values(Channels).forEach(channel => {
      this.subscriber.subscribe(channel, (message, channel) =>
        this.handleMessage(message, channel),
      );
    });
  }

  publish({ channel, message }: { channel: string; message: string }) {
    this.publisher.publish(channel, message);
  }

  broadcastChain() {
    this.publish({
      channel: Channels.Blockchain,
      message: JSON.stringify(this._blockchain.chain),
    });
  }
}
