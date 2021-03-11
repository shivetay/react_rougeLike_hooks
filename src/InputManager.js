class InputManager {
  observer = [];

  /* subscribe finction to a list of passed functions */
  subscribe(fn) {
    const thisSubscribe = this;

    thisSubscribe.observer.push(fn);
  }

  /* unsubscribe finction from a list of passed functions */
  unsubscribe(fn) {
    const thisSubscribe = this;

    thisSubscribe.observer.filter((subscriber) => subscriber !== fn);
  }

  broadcast(action, data) {
    const thisSubscribe = this;
    thisSubscribe.observer.forEach((subscriber) => subscriber(action, data));
  }

  /* key binding switch for arrows */
  handleKeys = (e) => {
    e.preventDefault();
    switch (e.keyCode) {
      // left
      case 37:
        this.broadcast('move', { x: -1, y: 0 });
        break;

      //up
      case 38:
        this.broadcast('move', { x: 0, y: -1 });
        break;

      // right
      case 39:
        this.broadcast('move', { x: 1, y: 0 });
        break;

      //down
      case 40:
        this.broadcast('move', { x: 0, y: 1 });
        break;

      default:
        break;
    }
  };

  /* add/remove event listeners for keys */
  bindKeys() {
    document.addEventListener('keydown', this.handleKeys);
  }
  unbindKeys() {
    document.removeEventListener('keydown', this.handleKeys);
  }
}

export default InputManager;
