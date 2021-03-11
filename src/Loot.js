import Entity from './Entities';

class Loot extends Entity {
  action(verb, world) {
    if (verb === 'bum') {
      console.log('loot', this);
    }
    if (verb === 'drop') {
      console.log('lost loot', this);
    }
  }
}

export default Loot;
