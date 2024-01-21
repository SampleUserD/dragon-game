// new Parameters({ speed: 0, acceleration: 1, mass: 10 })

const PARAMETERS = [ 'speed', 'acceleration', 'mass' ];

export class Parameters {
  #_parameters = {};

  add(key, value) {
    if (PARAMETERS[key]) {
      this.#_parameters[key] = value;
    }
  }
}