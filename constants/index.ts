/* NOTE: this `is` the place for magic strings/numbers */

import IBlock from '../@interfaces/IBlock';

export const INITIAL_DIFFICULTY = 3;
// in milliseconds
export const MINE_RATE = 1000;

export const GENESIS_DATA: IBlock = {
  timestamp: 1,
  lastHash: '-----',
  hash: '=====',
  data: [],
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
};

export const INVALID_CHAIN_ERROR = 'passed invalid chain:';
