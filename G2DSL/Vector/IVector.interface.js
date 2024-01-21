import { ISegment } from '../Segment/ISegment.interface.js';
import { IPoint2D } from '../Point/IPoint.interface.js';
import { ICoordinates2D } from '../Coordinates/ICoordinates.interface.js';

export class IVector extends ISegment {
  constructor(start, end) {
    super(new IPoint2D(0, 0), new IPoint2D(0, 0));

    this.start = start;
    this.end = end;
  }


  add(vector) {
    if (vector instanceof IVector) {
      return new IVector(this.start, new IPoint2D(new ICoordinates2D(this.end.coordinates.x + vector.projections.x, this.end.coordinates.y + vector.projections.y))); 
    }
  }

  product(vector) {
    if (vector instanceof IVector) {
      return this.projections.x * vector.projections.x + this.projections.y * vector.projections.y;
    }

    return NaN;
  }

  isCollinear(vector) {
    if (vector instanceof IVector) {
      return vector.projections.x/this.projections.x == vector.projections.y/this.projections.y;
    }

    return false;
  }
  

  multiple(scalar) {
    if (!isNaN(parseInt(scalar))) {
      return new IVector(this.start, new IPoint2D(new ICoordinates2D(this.end.coordinates.x + this.projections.x*(scalar - 1), this.end.coordinates.y + this.projections.y*(scalar - 1))));
    }
  }


  get projections() {
    return new ICoordinates2D(this.end.coordinates.x - this.start.coordinates.x, this.end.coordinates.y - this.start.coordinates.y);
  }

  get start() {
    return this.A;
  }

  set start(point) {
    this.A = point;
  }

  get end() {
    return this.B;
  }

  set end(point) {
    this.B = point;
  }
}