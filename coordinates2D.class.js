export class Coordinates2D {
  #_coordinates = [0, 0];

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }


  get x() {
    return this.#_coordinates[0];
  }

  get y() {
    return this.#_coordinates[1];
  }
  

  set x(number) {
    if (typeof number === 'number') {
      this.#_coordinates[0] = number;
    }
  }

  set y(number) {
    if (typeof number === 'number') {
      this.#_coordinates[1] = number;
    }
  }
}