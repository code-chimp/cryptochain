import { createClient, RedisClientType } from 'redis';
import IBlockchain from '../../@interfaces/IBlockchain';

const Channels: Record<string, string> = {
  Test: 'TEST',
  Blockchain: 'BLOCKCHAIN',
};

export interface IPubRequest {
  channel: string;
  message: string;
}

export interface IPubSub {
  publisher: RedisClientType;
  subscriber: RedisClientType;
  handleMessage: (m: string, c: string) => void;
  subscribeToChannels: () => void;
  publish: (r: IPubRequest) => void;
  broadcastChain: () => void;
}

export default class PubSub implements IPubSub {
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

  subscribeToChannels = () => {
    Object.values(Channels).forEach(channel => {
      this.subscriber.subscribe(channel, (message, channel) =>
        this.handleMessage(message, channel),
      );
    });
  };

  publish({ channel, message }: IPubRequest) {
    this.publisher.publish(channel, message);
  }

  broadcastChain() {
    this.publish({
      channel: Channels.Blockchain,
      message: JSON.stringify(this._blockchain.chain),
    });
  }
}
