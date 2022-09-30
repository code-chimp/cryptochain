import IBlock from '../@interfaces/IBlock';
import { GENESIS_DATA } from '../constants';
import { cryptoHash } from '../utilities';

export default class Block implements IBlock {
  timestamp: number;
  lastHash: string;
  hash: string;
  data: unknown;

  constructor({ timestamp, lastHash, hash, data }: IBlock) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  static genesis(): IBlock {
    return new this({ ...GENESIS_DATA });
  }

  static mineBlock({ lastBlock, data }: { lastBlock: IBlock; data: unknown }): IBlock {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    const hash = cryptoHash(timestamp, lastHash, data);

    return new this({
      timestamp,
      lastHash,
      hash,
      data,
    });
  }
}
