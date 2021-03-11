class Entity {
  constructor(x, y, size, attributes) {
    const thisEntity = this;

    thisEntity.x = x;
    thisEntity.y = y;
    thisEntity.size = size;
    thisEntity.attributes = { ...attributes };
  }
  action(verb, world) {
    console.log(`action: ${verb}`, this);
  }

  draw(context) {
    const thisEntity = this;
    thisEntity.context = context;

    thisEntity.context.fillStyle = thisEntity.attributes.color || 'white';
    thisEntity.contexttextBaseline = 'hanging';
    thisEntity.context.font = '16px Helvetica';
    thisEntity.context.fillText(
      thisEntity.attributes.ascii,
      thisEntity.x * thisEntity.size +
        (thisEntity.attributes.offset ? thisEntity.attributes.offset.x : 0),
      thisEntity.y * thisEntity.size +
        (thisEntity.attributes.offset ? thisEntity.attributes.offset.y : 0)
    );
  }
}

export default Entity;
