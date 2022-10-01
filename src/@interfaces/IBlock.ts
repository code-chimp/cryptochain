interface IBlock {
  timestamp: number;
  lastHash: string;
  hash: string;
  data: unknown;
  nonce: number;
  difficulty: number;
}

export default IBlock;
