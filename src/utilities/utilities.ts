import * as crypto from 'crypto';

export function cryptoHash(...inputs: Array<unknown>): string {
  const hash = crypto.createHash('sha256');

  hash.update(inputs.sort().join(' '));

  return hash.digest('hex');
}
