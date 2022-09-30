import IBlock from '../@interfaces/IBlock';
import IBlockchain from '../@interfaces/IBlockchain';
import Block from '../block';
import { cryptoHash } from '../utilities';
import { INVALID_CHAIN_ERROR } from '../constants';

export default class Blockchain implements IBlockchain {
  chain: Array<IBlock> = [];

  constructor() {
    this.chain.push(Block.genesis());
  }

  addBlock({ data }: { data: unknown }): number {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data,
    });

    this.chain.push(newBlock);

    return 1;
  }

  replaceChain(chain: Array<IBlock>): void {
    if (chain.length > this.chain.length) {
      if (!Blockchain.isValidChain(chain)) {
        // log when we have a bad actor present
        console.error(`${INVALID_CHAIN_ERROR} ${JSON.stringify(chain)}`);
        return;
      }

      this.chain = [...chain];
    }
  }

  public static isValidChain(chain: Array<IBlock>): boolean {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i = 1, j = chain.length; i < j; i++) {
      const { timestamp, lastHash, hash, data } = chain[i];

      // verify ordering
      if (lastHash !== chain[i - 1].hash) {
        return false;
      }

      // verify content
      if (hash !== cryptoHash(timestamp, lastHash, data)) {
        return false;
      }
    }

    return true;
  }
}
