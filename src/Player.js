class Player {
  constructor(x, y, size) {
    const thisPlayer = this;

    thisPlayer.x = x;
    thisPlayer.y = y;
    thisPlayer.size = size;
  }

  move(dx, dy) {
    const thisPlayer = this;

    thisPlayer.x += dx;
    thisPlayer.y += dy;
  }

  draw(context) {
    const thisPlayer = this;

    thisPlayer.context = context;

    context.fillStyle = 'red';
    context.textBaseline = 'hanging';
    context.font = '16px Helvetica';
    context.fillText('@', thisPlayer.x, thisPlayer.y, thisPlayer.size);
    console.log(
      context.fillText('@', thisPlayer.x, thisPlayer.y, thisPlayer.size),
      thisPlayer.x,
      thisPlayer.size,
      thisPlayer.context
    );
  }
}

export default Player;
