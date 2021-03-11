import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import InputManager from './InputManager';
import Player from './Player';
import World from './World';

const Game = ({ width, height, tilesize }) => {
  const canvasRef = useRef();

  /* hardoceded player display */
  // const [player, setPlayer] = useState({ x: 20, y: 28 });

  const [player, setPlayer] = useState(new Player(1, 2, tilesize));
  const [world, setWorld] = useState(new World(width, height, tilesize));

  let inputManager = new InputManager();

  /* moving player */
  const handleInput = (action, data) => {
    let newPlayer = new Player();
    Object.assign(newPlayer, player);
    newPlayer.move(data.x, data.y);

    /*hardcode player draw
    code moved to Player.js
    */
    // let newPlayer = { ...player };

    // /* movle player by one square */
    // newPlayer.x += data.x * tilesize;
    // newPlayer.y += data.y * tilesize;

    setPlayer(newPlayer);
  };

  /* draw use effect */
  useEffect(() => {
    const context = canvasRef.current.getContext('2d');

    context.clearRect(0, 0, width * tilesize, height * tilesize);

    world.draw(context);
    /*
    hardcode player draw moved to Player.js
    context.fillStyle = '#000000';
    // from useEffect player.x and y will render new position of player
    context.fillRect(player.x, player.y, 20, 20);
    */
    player.draw(context);
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
