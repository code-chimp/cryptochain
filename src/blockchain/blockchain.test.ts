import Blockchain from './blockchain';
import IBlockchain from '../@interfaces/IBlockchain';
import { GENESIS_DATA, INVALID_CHAIN_ERROR } from '../constants';
import IBlock from '../@interfaces/IBlock';

describe('Blockchain', () => {
  describe('base functionality', () => {
    let blockchain: IBlockchain;

    beforeEach(() => {
      blockchain = new Blockchain();
    });

    it('should contain a `chain` property', () => {
      expect(blockchain).toBeDefined();
      expect(Array.isArray(blockchain.chain)).toBe(true);
    });

    it('should have a genesis block in the `chain` property', () => {
      expect(blockchain.chain.length).toBeGreaterThan(0);
      expect(blockchain.chain[0]).toEqual(GENESIS_DATA);
    });

    it('should add a new block to the end of the `chain` property', () => {
      const data = 'some ol data yo';
      const data1 = ['hodor', 'HODOR', 'HOdor'];

      const result = blockchain.addBlock({ data });

      expect(result).toBe(1);
      expect(blockchain.chain.length).toBe(2);
      expect(blockchain.chain[0]).toEqual(GENESIS_DATA);
      expect(blockchain.chain[1].data).toEqual(data);

      blockchain.addBlock({ data: data1 });

      expect(blockchain.chain.length).toBe(3);
      expect(blockchain.chain[0]).toEqual(GENESIS_DATA);
      expect(blockchain.chain[2].data).toEqual(data1);
    });
  });

  describe('replaceChain()', () => {
    const errorMock = jest.fn();
    let actualError: () => void;
    let target: Blockchain;
    let incoming: Blockchain;

    beforeAll(() => {
      actualError = global.console.error;
      global.console.error = errorMock;
    });

    afterAll(() => {
      global.console.error = actualError;
    });

    beforeEach(() => {
      target = new Blockchain();
      incoming = new Blockchain();
    });

    it('should not replace the chain when incoming is shorter', () => {
      target.addBlock({ data: 'one' });
      target.addBlock({ data: 'two' });
      target.addBlock({ data: 'three' });

      incoming.addBlock({ data: 'one' });
      incoming.addBlock({ data: 'two' });

      target.replaceChain(incoming.chain);

      expect(target.chain).not.toEqual(incoming.chain);
      expect(errorMock).not.toHaveBeenCalled();
    });

    it('should not replace the chain when incoming is longer but invalid', () => {
      target.addBlock({ data: 'one' });
      target.addBlock({ data: 'two' });

      incoming.addBlock({ data: 'one' });
      incoming.addBlock({ data: 'two' });
      incoming.addBlock({ data: 'three' });
      incoming.chain[1].data = 'kthxbain00b';
      const errorMessage = `${INVALID_CHAIN_ERROR} ${JSON.stringify(incoming.chain)}`;

      target.replaceChain(incoming.chain);

      expect(target.chain).not.toEqual(incoming.chain);
      expect(errorMock).toHaveBeenCalledWith(errorMessage);
    });

    it('should replace the chain when incoming is longer and is valid', () => {
      target.addBlock({ data: 'one' });
      target.addBlock({ data: 'two' });

      incoming.addBlock({ data: 'one' });
      incoming.addBlock({ data: 'two' });
      incoming.addBlock({ data: 'three' });

      target.replaceChain(incoming.chain);

      expect(target.chain).toEqual(incoming.chain);
    });
  });

  describe('static isValidChain()', () => {
    let chain: Array<IBlock>;

    beforeEach(() => {
      const blockchain = new Blockchain();
      blockchain.addBlock({ data: 'one' });
      blockchain.addBlock({ data: 'two' });
      blockchain.addBlock({ data: 'three' });
      chain = [...blockchain.chain];
    });

    it('should return `false` with no genesis block', () => {
      chain.shift();

      expect(Blockchain.isValidChain(chain)).toBe(false);
    });

    it('should return `false` if the hash sequence has been altered', () => {
      chain[2].lastHash = 'iamth3l33tzh4xx0rz';

      expect(Blockchain.isValidChain(chain)).toBe(false);
    });

    it('should return `false` if block content has been altered', () => {
      chain[2].data = 'iamth3l33tzh4xx0rz';

      expect(Blockchain.isValidChain(chain)).toBe(false);
    });

    it('should return `true` if the chain is valid', () => {
      expect(Blockchain.isValidChain(chain)).toBe(true);
    });
  });
});
