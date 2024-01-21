export class EventHandler {
  #_name = '';
  #_callback = () => undefined;

  constructor(name, callback) {
    if (typeof name === 'string') this.#_name = name;
    if (callback instanceof Function) this.#_callback = callback;
  }


  fire(data) {
    this.#_callback(data);
  }

  is (name) {
    return name === this.name;
  }


  get name() {
    return this.#_name;
  }
}