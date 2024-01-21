export class ICoordinates2D {
  #_coordinates = [ 0, 0 ];


  constructor(x, y) {
    this.x = x;
    this.y = y;
  }


  get x() {
    return this.#_coordinates[0];
  }

  set x(number) {
    !isNaN(parseInt(number)) ? this.#_coordinates[0] = number : undefined;
  }

  get y() {
    return this.#_coordinates[1];
  }

  set y(number) {
    !isNaN(parseInt(number)) ? this.#_coordinates[1] = number : undefined;
  }
}