import IBlock from '../../@interfaces/IBlock';

export const fetchBlocks = async (): Promise<Array<IBlock>> => {
  try {
    const result = await fetch('/api/blocks');

    return (await result.json()) as Array<IBlock>;
  } catch (e) {
    throw new Error(`ChainApi.fetchBlocks: ${(e as { message?: string }).message}`);
  }
};
