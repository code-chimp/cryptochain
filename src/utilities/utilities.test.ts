import { cryptoHash } from './utilities';

describe('utilities', () => {
  describe('cryptoHash()', () => {
    it('should return a SHA-256 hash of a given value', () => {
      const result = cryptoHash('TestyMcTestFace');

      expect(result).toBe('55063577e153e42fb60376c1f462e52f44581b70780b8e396f0c8909772ec888');
    });

    it('should return the same hash of the same arguments in any order', () => {
      const result1 = cryptoHash('one', 'two', 'three');
      const result2 = cryptoHash('two', 'three', 'one');
      const result3 = cryptoHash('three', 'one', 'two');

      expect(result1).toEqual(result2);
      expect(result2).toEqual(result3);
      expect(result3).toEqual(result1);
    });
  });
});
