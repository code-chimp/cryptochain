import React, { FC, useEffect, useState } from 'react';
import { fetchBlocks } from '../../services/ChainApi';

const App: FC = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    fetchBlocks().then(blocks => setCount(blocks.length));
  }, []);

  return (
    <div>
      <h1>Welcome to Cryptochain!</h1>
      <h3>[stub front-end functionality]</h3>
      <p>There are currently {count} block(s) on the chain</p>
    </div>
  );
};

export default App;
