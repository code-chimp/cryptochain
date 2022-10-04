import IBlock from '../@interfaces/IBlock';

const mockChain: Array<IBlock> = [
  {
    timestamp: 1,
    lastHash: '-----',
    hash: '=====',
    data: [],
    difficulty: 3,
    nonce: 0,
  },
  {
    timestamp: 1664912323208,
    lastHash: '=====',
    hash: '12d331b40d8ef653827c9e43502c3ee73232038be01937f1cd8328fe699a85a8',
    data: ['lookit', 'da', 'birdie'],
    difficulty: 2,
    nonce: 8,
  },
  {
    timestamp: 1664912364866,
    lastHash: '12d331b40d8ef653827c9e43502c3ee73232038be01937f1cd8328fe699a85a8',
    hash: '458059ca76b703b0be6d7f30b80fb44ad3b8436348032f59efcf5056930b2b38',
    data: ['data', "come'n", "get'ur", 'data'],
    difficulty: 1,
    nonce: 1,
  },
  {
    timestamp: 1664912386011,
    lastHash: '458059ca76b703b0be6d7f30b80fb44ad3b8436348032f59efcf5056930b2b38',
    hash: '15c3351282a1c3a5744e101c005243a3df0b9ce781c3a76d55f850c28fd3dbdd',
    data: ['why', 'not', 'both?'],
    difficulty: 1,
    nonce: 2,
  },
  {
    timestamp: 1664912416611,
    lastHash: '15c3351282a1c3a5744e101c005243a3df0b9ce781c3a76d55f850c28fd3dbdd',
    hash: '2f0211da93f4ef426f4588c1ba36db5cdbc6802e8ef8156494f9507af253da74',
    data: ['not', 'your', 'friend', 'buddy'],
    difficulty: 1,
    nonce: 4,
  },
  {
    timestamp: 1664912432611,
    lastHash: '2f0211da93f4ef426f4588c1ba36db5cdbc6802e8ef8156494f9507af253da74',
    hash: '12e5596c6f124fc0989a2f61cc79b48b5e16a8ce5abfb43ad47d8a531c406d1f',
    data: ['not', 'your', 'buddy', 'amigo'],
    difficulty: 1,
    nonce: 1,
  },
];

export default mockChain;
