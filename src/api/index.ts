import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import Blockchain from '../blockchain';
import PubSub from './utils/pub-sub';
import swaggerDocs from './utils/swagger';
import syncChains from './utils/sync-chains';
import logger from './utils/logger';
import routes from './routes';

dotenv.config();

const port = process.env.API_PORT || 3000;
const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });

const app = express();
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app, blockchain, pubsub);
swaggerDocs(app);

app.get('(/*)?', async (_req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
  const runningUri = `http://localhost:${port}`;

  logger.info(`api listening on ${runningUri}`);

  syncChains(blockchain, runningUri);
});
