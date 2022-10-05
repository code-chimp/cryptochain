/**
 * @openapi
 * components:
 *   schemas:
 *     Block:
 *       type: object
 *       properties:
 *         timestamp:
 *           type: number
 *         lastHash:
 *           type: string
 *         hash:
 *           type: string
 *         data:
 *           oneOf:
 *             - type: object
 *             - type: string
 *             - type: number
 *             - type: array
 *         nonce:
 *           type: number
 *         difficulty:
 *           type: number
 */
interface IBlock {
  timestamp: number;
  lastHash: string;
  hash: string;
  data: unknown;
  nonce: number;
  difficulty: number;
}

export default IBlock;
