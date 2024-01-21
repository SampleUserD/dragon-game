import { IShape } from './IShape.interface.js';
import { IVector } from '../Vector/IVector.interface.js';
import { IPoint2D } from '../Point/IPoint.interface.js';
import { StraightLineUtilites } from '../Straight-Line/utilites.js';


export class Shape extends IShape {
  #_vertexes = [];


  constructor() {
    super();
  }

  addVertex(point) {
    if (point instanceof IPoint2D) {
      this.#_vertexes.push(point);
    }
  }

  removeVertex(index) {
    if (!isNaN(parseInt(index))) {
      this.#_vertexes.splice(index, 1);
    }
  }


  measureArea() {
    
  }

  hasCollisionWith(figure) {
    return this.edges.some(edge => figure.edges.some(_edge => edge.hasInterscectionWith(_edge)));
  }

  hasPointIn() {

  }


  get vertexes() {
    return Object.freeze(this.#_vertexes.map(vertex => Object.freeze(vertex)));
  }

  get edges() {
    return this.vertexes.map((vertex, index) => new IVector(vertex, this.vertexes[(index + 1)%this.vertexes.length]));
  }
}