import { EventHandler } from './EventHandler.class.js';
import { EventListener } from './EventListener.class.js';

export class EventListenerAdapter {
  #_eventListener = new EventListener();

  add(name, handler) {
    this.#_eventListener.add(new EventHandler(name, handler));
  }

  fire(name, data) {
    this.#_eventListener.fire(name, data);
  }
}