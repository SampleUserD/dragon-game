import { EventHandler } from './EventHandler.class.js';

export class EventListener {
  #_events = [];

  add(eventHandler) {
    if (eventHandler instanceof EventHandler) {
      this.#_events.push(eventHandler);
    }
  }

  fire(name, data) {
    const eventHandlers = this.#_events.filter(handler => handler.is(name));

    eventHandlers.forEach(handler => handler.fire(data));
  }
}