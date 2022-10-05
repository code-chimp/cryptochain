import { Express, Request, Response } from 'express';
import IBlockchain from '../@interfaces/IBlockchain';
import { IPubSub } from './utils/pub-sub';

function routes(app: Express, blockchain: IBlockchain, pubsub: IPubSub) {
  /**
   * @openapi
   * '/api/blocks':
   *  get:
   *     summary: Returns a list of the current blocks on the chain
   *     responses:
   *       '200':
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#components/schemas/Block'
   */
  app.get('/api/blocks', (_req: Request, res: Response) => {
    res.json(blockchain.chain);
  });

  /**
   * @openapi
   * '/api/mine':
   *  post:
   *    summary: Add data to the blockchain
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              data:
   *                oneOf:
   *                - type: object
   *                - type: string
   *                - type: number
   *                - type: array
   *    responses:
   *      '200':
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#components/schemas/Block'   */
  app.post('/api/mine', (req: Request, res: Response) => {
    const { data } = req.body;

    blockchain.addBlock({ data });

    pubsub.broadcastChain();

    res.redirect('/api/blocks');
  });
}

export default routes;
