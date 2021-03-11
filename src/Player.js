import Entity from './Entities';

class Player extends Entity {
  // constructor(x, y, size) {
  //   const thisPlayer = this;

  //   thisPlayer.x = x;
  //   thisPlayer.y = y;
  //   thisPlayer.size = size;
  // }

  attributes = {
    name: 'Player',
    ascii: '@',
    health: 10,
    color: 'red',
    offset: { x: 2, y: 2 },
  };

  move(dx, dy) {
    const thisPlayer = this;

    thisPlayer.x += dx;
    thisPlayer.y += dy;
  }

  /* this draw player based on widt and tile size will move one tile siez*/
  // draw(context) {
  //   const thisPlayer = this;

  //   thisPlayer.context = context;

  //   context.fillStyle = 'red';
  //   context.textBaseline = 'hanging';
  //   context.font = '16px Helvetica';
  //   context.fillText(
  //     '@',
  //     thisPlayer.x * thisPlayer.size,
  //     thisPlayer.y * thisPlayer.size
  //   );
  // }

  /* wall colision */
  copyPlayer() {
    // copy of our player will hceck if there is a wall or not
    let newPlayer = new Player();
    Object.assign(newPlayer, this);
    return newPlayer;
  }
}

export default Player;
