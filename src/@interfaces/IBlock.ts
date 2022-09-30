interface IBlock {
  timestamp: number;
  lastHash: string;
  hash: string;
  data: unknown;
}

export default IBlock;
