import { ICoordinates2D } from '../Coordinates/ICoordinates.interface.js';

class IPoint2D {
  #_coordinates = new ICoordinates2D(0, 0);


  constructor(coordinates) {
    this.coordinates = coordinates;
  }


  distance(point) {
    return point instanceof IPoint2D ? Math.hypot(this.coordinates.x - point.coordinates.x, this.coordinates.y - point.coordinates.y) : NaN;  
  }

  translate(coordinates) {
    coordinates instanceof ICoordinates2D ? (this.coordinates.x += coordinates.x, this.coordinates.y += coordinates.y) : undefined; 
  }


  get coordinates() {
    return this.#_coordinates;
  }

  set coordinates(coordinates) {
    coordinates instanceof ICoordinates2D ? this.#_coordinates = coordinates : undefined;
  }
}

export { IPoint2D }