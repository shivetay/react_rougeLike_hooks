import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import InputManager from './InputManager';

const Game = ({ width, height, tilesize }) => {
  const canvasRef = useRef();
  const [player, setPlayer] = useState({ x: 20, y: 28 });

  let inputManager = new InputManager();

  /* moving player */
  const handleInput = (action, data) => {
    let newPlayer = { ...player };

    /* movle player by one square */
    newPlayer.x += data.x * tilesize;
    newPlayer.y += data.y * tilesize;

    setPlayer(newPlayer);
  };

  /* draw use effect */
  useEffect(() => {
    const context = canvasRef.current.getContext('2d');

    context.clearRect(0, 0, width * tilesize, height * tilesize);
    context.fillStyle = '#000000';

    // from useEffect player.x and y will render new position of player
    context.fillRect(player.x, player.y, 20, 20);

    console.log('Canvas wisible');
  });

  /* key binding useEffect */
  useEffect(() => {
    inputManager.bindKeys();
    inputManager.subscribe(handleInput);

    console.log('Use Arrows to move');

    return () => {
      inputManager.unbindKeys();
      inputManager.unsubscribe(handleInput);
    };
  });

  return (
    <canvas
      ref={canvasRef}
      width={width * tilesize}
      height={height * tilesize}
      style={{ border: '1px solid black' }}></canvas>
  );
};

Game.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  tilesize: PropTypes.number.isRequired,
};

export default Game;
