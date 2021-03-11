import { Map } from 'rot-js';
import Player from './Player';

class World {
  constructor(width, height, tilesize) {
    const thisWorld = this;
    thisWorld.width = width;
    thisWorld.height = height;
    thisWorld.tilesize = tilesize;
    thisWorld.entities = [new Player(0, 0, 16)]; // this will keep player monsters and all we wnat to be in our world
    thisWorld.worldmap = new Array(thisWorld.width);

    // 2d array for world tiles
    for (let x = 0; x < thisWorld.width; x++) {
      thisWorld.worldmap[x] = new Array(thisWorld.height);
    }

    // thisWorld.createCellularMap();
    // thisWorld.createRandomMap();
  }

  /* rot-js map generator */
  createCellularMap() {
    const thisWorld = this;
    const map = new Map.Cellular(thisWorld.width, thisWorld.height, {
      connected: true,
    });
    map.randomize(0.5);

    const userCallback = (x, y, value) => {
      if (
        x === 0 ||
        y === 0 ||
        x === thisWorld.width - 1 ||
        y === thisWorld.height - 1
      ) {
        thisWorld.worldmap[x][y] = 1; // create wall around all world
        return;
      }
      thisWorld.worldmap[x][y] = value === 0 ? 1 : 0;
    };
    map.create(userCallback);
    map.connect(userCallback, 1);
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

  get player() {
    const thisWorld = this;

    return thisWorld.entities[0];
  }

  add(entity) {
    const thisWorld = this;

    thisWorld.entities.push(entity);
  }

  moveToSpace(entity) {
    const thisWorld = this;

    thisWorld.entity = entity;

    for (let x = thisWorld.entity.x; x < thisWorld.width; x++) {
      for (let y = thisWorld.entity.y; y < thisWorld.height; y++) {
        if (thisWorld.worldmap[x][y] === 0) {
          thisWorld.entity.y = y;
          thisWorld.entity.x = x;
          return;
        }
      }
    }
  }

  isWall(x, y) {
    const thisWorld = this;
    return (
      thisWorld.worldmap[x] === undefined ||
      thisWorld.worldmap[y] === undefined ||
      thisWorld.worldmap[x][y] === 1
    );
  }

  getEntityAtLocation(x, y) {
    const thisWorld = this;
    return thisWorld.entities.find(
      (entity) => entity.x === x && entity.y === y
    );
  }

  movePlayer(dx, dy) {
    //creat a temp player
    let tempPlayer = this.player.copyPlayer();
    // check if temp player is not in wal if not move actual player
    tempPlayer.move(dx, dy);
    let entity = this.getEntityAtLocation(tempPlayer.x, tempPlayer.y);

    if (entity) {
      console.log(entity);
      entity.action('bump', this);
    }
    if (this.isWall(tempPlayer.x, tempPlayer.y)) {
      console.log('wall');
    } else {
      this.player.move(dx, dy);
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
    thisWorld.entities.forEach((entity) => {
      entity.draw(context);
    });
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
