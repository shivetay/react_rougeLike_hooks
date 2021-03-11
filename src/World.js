class World {
  constructor(width, height, tilesize) {
    const thisWorld = this;
    thisWorld.width = width;
    thisWorld.height = height;
    thisWorld.tilesize = tilesize;
    thisWorld.worldmap = new Array(thisWorld.width);

    // 2d array for world tiles
    for (let x = 0; x < thisWorld.width; x++) {
      thisWorld.worldmap[x] = new Array(thisWorld.height);
    }

    thisWorld.createRandomMap();
  }

  /* random map creator */
  createRandomMap() {
    const thisWorld = this;

    for (let x = 0; x < thisWorld.width; x++) {
      for (let y = 0; y < thisWorld.height; y++) {
        thisWorld.worldmap[x][y] = Math.round(Math.random());
      }
    }
  }

  draw(context) {
    const thisWorld = this;
    thisWorld.context = context;

    //draw methid will got through arra for 1 will draw bolck
    for (let x = 0; x < thisWorld.width; x++) {
      for (let y = 0; y < thisWorld.height; y++) {
        if (thisWorld.worldmap[x][y] === 1) {
          this.drawWall(context, x, y);
        }
      }
    }
  }

  drawWall(context, x, y) {
    const thisWorld = this;
    context.fillStyle = 'green';
    context.fillRect(
      x * thisWorld.tilesize,
      y * thisWorld.tilesize,
      thisWorld.tilesize,
      thisWorld.tilesize
    );
  }
}

export default World;
