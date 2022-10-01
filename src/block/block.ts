import IBlock from '../@interfaces/IBlock';
import { GENESIS_DATA } from '../constants';
import { cryptoHash } from '../utilities';

export default class Block implements IBlock {
  timestamp: number;
  lastHash: string;
  hash: string;
  nonce: number;
  difficulty: number;
  data: unknown;

  constructor({ timestamp, lastHash, hash, data, nonce, difficulty }: IBlock) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.difficulty = difficulty;
    this.nonce = nonce;
  }

  static genesis(): IBlock {
    return new this({ ...GENESIS_DATA });
  }

  static mineBlock({ lastBlock, data }: { lastBlock: IBlock; data: unknown }): IBlock {
    const { difficulty, hash: lastHash } = lastBlock;
    let hash: string;
    let timestamp: number;
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();
      hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this({
      timestamp,
      lastHash,
      hash,
      data,
      difficulty,
      nonce,
    });
  }
}
