import IBlock from './IBlock';

interface IBlockchain {
  chain: Array<IBlock>;
  addBlock: (d: { data: unknown }) => number;
  replaceChain: (c: Array<IBlock>) => void;
}

export default IBlockchain;
