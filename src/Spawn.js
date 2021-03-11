import Loot from './Loot';

const lootTable = [
  { name: 'sword', color: 'grey', ascii: '/', offset: { x: 6, y: 3 } },
  { name: 'health', color: 'red', ascii: '!', offset: { x: 8, y: 14 } },
  { name: 'mana', color: 'blue', ascii: '?', offset: { x: 12, y: 25 } },
  { name: 'coin', color: 'yellow', ascii: '$', offset: { x: 18, y: 32 } },
  { name: 'armor', color: 'silver', ascii: '#', offset: { x: 1, y: 1 } },
];

class Sapwn {
  constructor(world) {
    const thisSpawn = this;
    thisSpawn.world = world;
  }

  spawn(spawnCount, createEntity) {
    const thisSpawn = this;
    thisSpawn.spawnCount = spawnCount;
    thisSpawn.createEntity = createEntity;
    for (let count = 0; count < thisSpawn.spawnCount; count++) {
      let entity = createEntity();
      thisSpawn.world.add(entity);
      thisSpawn.world.moveToSpace(entity);
    }
  }

  spawnLoot(spawnCount) {
    const thisSpawn = this;
    thisSpawn.spawnCount = spawnCount;
    this.spawn(thisSpawn.spawnCount, () => {
      return new Loot(
        getRandomInt(thisSpawn.world.width - 1),
        getRandomInt(thisSpawn.world.height - 1),
        thisSpawn.world.tilesize,
        lootTable[getRandomInt(lootTable.length)]
      );
    });
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default Sapwn;
