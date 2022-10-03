/* eslint-disable no-console */

/*
  One-off script to get a feel for the difficulty adjustment affecting
  the average time to mine a block
 */

import Blockchain from '../blockchain';
import IBlock from '../@interfaces/IBlock';

const times: Array<number> = [];
let prevTimestamp, nextTimestamp, timeDiff, average: number;
let nextBlock: IBlock;

const chain = new Blockchain();
chain.addBlock({ data: 'initial' });
average = 0;

for (let i = 0; i < 2000; i++) {
  prevTimestamp = chain.chain[chain.chain.length - 1].timestamp;

  chain.addBlock({ data: `block: ${i}` });

  nextBlock = chain.chain[chain.chain.length - 1];
  nextTimestamp = nextBlock.timestamp;

  timeDiff = nextTimestamp - prevTimestamp;
  times.push(timeDiff);

  average = times.reduce((total, num) => total + num) / times.length;

  console.log(
    `Block ${i}:\n\tTime to mine: ${timeDiff}ms\tDifficulty: ${nextBlock.difficulty}\tRunning average: ${average}ms\n`,
  );
}

console.log(`\nGrand total:\n\t\t\tAverage time: ${average}ms\n\n`);
