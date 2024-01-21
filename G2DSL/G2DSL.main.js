import { StraightLineUtilites } from './Straight-Line/utilites.js';
import { ICoordinates2D } from './Coordinates/ICoordinates.interface.js';
import { IPoint2D } from './Point/IPoint.interface.js';
import { IVector } from './Vector/IVector.interface.js';
import { IShape } from './Shape/IShape.interface.js';
import { Shape } from './Shape/Shape.realisation.js';

export class G2DSLTypeChecking {
  static isCoordinate = object => object instanceof ICoordinates2D;
  static isPoint = object => object instanceof IPoint2D;
  
  static isVector = object => object instanceof IVector;

  static isShape = object => object instanceof IShape;
}

export class G2DSLUtilites {
  static straight = StraightLineUtilites;
}

export class G2DSLObjects {
  static createCoordinate = (x, y) => new ICoordinates2D(x, y);
  static createPoint = (x, y) => new IPoint2D(G2DSLObjects.createCoordinate(x, y));

  static createVector = (start, end) => new IVector(start, end);

  static createShape = vertexes => {
    if (!Array.isArray(vertexes)) return new Shape();

    const shape = new Shape();
    vertexes.forEach(vertex => shape.addVertex(vertex));

    return shape;
  }
}