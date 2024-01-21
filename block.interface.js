import { Coordinates2D } from './coordinates2D.class.js';
import { STANDART_BLOCK_SIZE } from './standart-size.constant.js';

/**
 * :SCENE(listener) <-- [ :player, :block ] (Event: collision) => execute(:block.events[:name])
 * 
 * Example: 
 * :Scene.listen(:player, :block) (if event :name fired => :block.events[:name].|.map(handler => handler(sender, target, event))|)
 */

export class BlockSketch {
  #_size = STANDART_BLOCK_SIZE;
  #_coordinates = new Coordinates2D(0, 0);

  #_renderers = []; // needs separations to other class
  #_actions = []; // needs separations to other class
  #_events = {}; // needs separations to other class (example of event is "onclick": sender (click) -> target(eventObj))

  constructor(size, coordinates) {
    this.size = size;
    this.coordinates = coordinates;
  }

  render(context) {} // renders something(arguments - ?)
  act(context) {}    // executes actions in "#_actions"
  fire(sender, target, event) {
    // this.#_events[event.name].forEach(handler => handler.call(sender, sender, target, event)); 
  }

  get size() {
    return this.#_size;
  }

  get coordinates() {
    return this.#_coordinates;
  }


  set size(number) {
    if (typeof number === 'number') {
      if (number > 0) {
        this.#_size = number;
      }
    }
  }

  set coordinates(coordinates) {
    if (coordinates instanceof Coordinates2D) {
      this.#_coordinates = coordinates;
    }
  }
}