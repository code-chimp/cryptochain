import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import HttpStatusCodes from '../@enums/HttpStatusCodes';
import IBlock from '../@interfaces/IBlock';
import Blockchain from '../blockchain';
import PubSub from './pub-sub';

dotenv.config();

const port = process.env.API_PORT || 3000;
const rootNodeUri = process.env.ROOT_NODE_URI || 'http://localhost:3000';

const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const syncChains = async (): Promise<void> => {
  try {
    const res = await fetch(`${rootNodeUri}/api/blocks`);

    if (res.status === HttpStatusCodes.Ok) {
      const chain = (await res.json()) as Array<IBlock>;

      blockchain.replaceChain(chain);
    }
  } catch (e) {
    console.error('unable to retrieve chain from root', e);
  }
};

app.get('/api/blocks', (_req, res) => {
  res.json(blockchain.chain);
});

app.post('/api/mine', (req, res) => {
  const { data } = req.body;

  blockchain.addBlock({ data });

  pubsub.broadcastChain();

  res.redirect('/api/blocks');
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
  const runningUri = `http://localhost:${port}`;

  // eslint-disable-next-line no-console
  console.log(`api listening on ${runningUri}`);

  if (runningUri !== rootNodeUri) {
    syncChains();
  }
});
