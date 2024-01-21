import { IVector } from '../Vector/IVector.interface.js';


export class IShape {
  addVertex(point) {};
  removeVertex(index) {};

  measureArea() {};
  hasCollisionWith(figure) {};
  hasPointIn(point) {};
}