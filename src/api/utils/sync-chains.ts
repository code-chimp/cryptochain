import fetch from 'node-fetch';
import HttpStatusCodes from '../../@enums/HttpStatusCodes';
import IBlock from '../../@interfaces/IBlock';
import IBlockchain from '../../@interfaces/IBlockchain';

const rootNodeUri = process.env.ROOT_NODE_URI || 'http://localhost:3000';

const syncChains = async (blockchain: IBlockchain, checkUri: string): Promise<void> => {
  // do not need to sync our own chain to ourself
  if (checkUri === rootNodeUri) {
    return;
  }

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

export default syncChains;
