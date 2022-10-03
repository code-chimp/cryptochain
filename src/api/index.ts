import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Blockchain from '../blockchain';
import PubSub from './pub-sub';

dotenv.config();

const port = process.env.API_PORT || 3000;

const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });

setTimeout(() => pubsub.broadcastChain(), 1000);

app.use(bodyParser.json());

app.get('/api/blocks', (_req, res) => {
  res.json(blockchain.chain);
});

app.post('/api/mine', (req, res) => {
  const { data } = req.body;

  blockchain.addBlock({ data });

  res.redirect('/api/blocks');
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`api listening on http://localhost:${port}`));
