const Block = require('./block');
const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');

describe('Block', () => {
  const timestamp = 'some-date';
  const lastHash = 'last-test-hash';
  const hash = 'test-hash';
  const data = ['blockchain', 'data'];
  const block = new Block({
    timestamp,
    lastHash,
    hash,
    data,
  });

  it('should have timestamp, lastHash, hash, and data properties', () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
  });

  describe('genesis()', () => {
    const genesisBlock = Block.genesis();

    it('returns a Block instance', () => {
      expect(genesisBlock).not.toBeNull();
      expect(genesisBlock instanceof Block).toBe(true);
    });

    it('returns a Block instance with genesis data', () => {
      expect(genesisBlock.data.length).toBe(0);
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });

  describe('mineBlock()', () => {
    const lastBlock = Block.genesis();
    const data = 'test data';
    const mined = Block.mineBlock({ lastBlock, data });

    it('returns a Block instance', () => {
      expect(mined).not.toBeNull();
      expect(mined instanceof Block).toBe(true);
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
