/* NOTE: this `is` the place for magic strings/numbers */

import IBlock from '../@interfaces/IBlock';

export const GENESIS_DATA: IBlock = {
  timestamp: 1,
  lastHash: '-----',
  hash: '=====',
  data: [],
};

export const INVALID_CHAIN_ERROR = 'passed invalid chain:';
