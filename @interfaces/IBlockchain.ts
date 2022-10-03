import IBlock from './IBlock';

interface IBlockchain {
  chain: Array<IBlock>;
  addBlock: (d: { data: unknown }) => number;
}

export default IBlockchain;
