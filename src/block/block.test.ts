import Block from './block';
import { GENESIS_DATA } from '../constants';
import { cryptoHash } from '../utilities';
import IBlock from '../@interfaces/IBlock';

describe('Block', () => {
  it('should have timestamp, lastHash, hash, and data properties', () => {
    const timestamp = 1289957;
    const lastHash = 'last-test-hash';
    const hash = 'test-hash';
    const data = ['blockchain', 'data'];
    const block = new Block({
      timestamp,
      lastHash,
      hash,
      data,
    });

    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
  });

  describe('genesis()', () => {
    let genesisBlock: IBlock;

    beforeEach(() => {
      genesisBlock = Block.genesis();
    });

    it('returns a Block instance', () => {
      expect(genesisBlock).not.toBeNull();
    });

    it('returns a Block instance with genesis data', () => {
      expect((genesisBlock.data as Array<any>).length).toBe(0);
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });

  describe('mineBlock()', () => {
    const data = 'test data';
    let lastBlock: IBlock;
    let mined: IBlock;

    beforeEach(() => {
      lastBlock = Block.genesis();
      mined = Block.mineBlock({ lastBlock, data });
    });

    it('returns a Block instance', () => {
      expect(mined).not.toBeNull();
    });

    it('should set `lastHash` to be `hash` of the last block', () => {
      expect(mined.lastHash).toBe(lastBlock.hash);
    });

    it('should set the `data`', () => {
      expect(mined.data).toEqual(data);
    });

    it('should have a timestamp', () => {
      expect(mined.timestamp).toBeDefined();
    });

    it('should create a SHA-256 hash based on the proper inputs', () => {
      const expected = cryptoHash(mined.timestamp, lastBlock.hash, data);

      expect(mined.hash).toBe(expected);
    });
  });
});
