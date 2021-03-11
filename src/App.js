import React from 'react';

import Game from './Game';

const App = () => (
  <div className='App'>
    <h1>Game</h1>
    <Game width={40} height={40} tilesize={16} />
  </div>
);

export default App;
