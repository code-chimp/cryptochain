import hexToBinary from 'hex-to-binary';
import IBlock from '../@interfaces/IBlock';
import { GENESIS_DATA, MINE_RATE } from '../constants';
import { cryptoHash } from '../utilities';
import Block from './block';

describe('Block', () => {
  it('should have the required properties', () => {
    const timestamp = 1289957;
    const lastHash = 'last-test-hash';
    const hash = 'test-hash';
    const data = ['blockchain', 'data'];
    const nonce = 1;
    const difficulty = 1;

    const block = new Block({
      timestamp,
      lastHash,
      hash,
      data,
      nonce,
      difficulty,
    });

    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
    expect(block.nonce).toEqual(nonce);
    expect(block.difficulty).toEqual(difficulty);
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
      const { timestamp, nonce, difficulty, hash } = mined;
      const expected = cryptoHash(timestamp, nonce, difficulty, lastBlock.hash, data);

      expect(hash).toBe(expected);
    });

    it('should match the difficulty criteria', () => {
      const expected = '0'.repeat(mined.difficulty);

      expect(hexToBinary(mined.hash).substring(0, mined.difficulty)).toEqual(expected);
    });

    it('should adjust the difficulty', () => {
      const { difficulty } = lastBlock;
      const possibilities = [difficulty + 1, difficulty - 1];

      expect(possibilities.includes(mined.difficulty)).toBe(true);
    });
  });

  describe('adjustDifficulty()', () => {
    let block: IBlock;

    beforeEach(() => {
      const timestamp = 1289957;
      const lastHash = 'last-test-hash';
      const hash = 'test-hash';
      const data = ['blockchain', 'data'];
      const nonce = 0;
      const difficulty = 3;

      block = new Block({
        timestamp,
        lastHash,
        hash,
        data,
        nonce,
        difficulty,
      });
    });

    it('should raise the difficulty for a quickly mined block', () => {
      const result = Block.adjustDifficulty({
        originalBlock: block,
        timestamp: block.timestamp + MINE_RATE - 100,
      });

      expect(result).toBe(block.difficulty + 1);
    });

    it('should lower the difficulty for a slowly mined block', () => {
      const result = Block.adjustDifficulty({
        originalBlock: block,
        timestamp: block.timestamp + MINE_RATE + 100,
      });

      expect(result).toBe(block.difficulty - 1);
    });

    it('should have a lower limit of 1', () => {
      const result = Block.adjustDifficulty({
        originalBlock: { ...block, difficulty: 1 },
        timestamp: block.timestamp + MINE_RATE + 100,
      });

      expect(result).toBe(1);
    });
  });
});
