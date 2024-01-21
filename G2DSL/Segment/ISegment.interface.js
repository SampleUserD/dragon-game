import { IPoint2D } from '../Point/IPoint.interface.js';
import { ICoordinates2D } from '../Coordinates/ICoordinates.interface.js';
import { StraightLineUtilites } from '../Straight-Line/utilites.js';


export class ISegment {
  #_A = new IPoint2D(new ICoordinates2D(0, 0));
  #_B = new IPoint2D(new ICoordinates2D(0, 0));

  constructor(A, B) {
    this.A = A;
    this.B = B;
  }


  hasPoint(point) {
    return (this.A.distance(point) <= this.length && this.B.distance(point) <= this.length);
  }
  
  hasInterscectionWith(segment) {
    if (segment instanceof ISegment) {
      const straight_1 = StraightLineUtilites.define(this.A, this.B);
      const straight_2 = StraightLineUtilites.define(segment.A, segment.B);

      const intersection = StraightLineUtilites.findIntersectionPoint(straight_1, straight_2); 

      return this.hasPoint(intersection) && segment.hasPoint(intersection);
    }

    return false;
  }


  get length() {
    return this.A.distance(this.B);
  }

  get A() {
    return this.#_A;
  }

  set A(point) {
    point instanceof IPoint2D ? this.#_A = point : undefined;
  }

  get B() {
    return this.#_B;
  }

  set B(point) {
    point instanceof IPoint2D ? this.#_B = point : undefined;
  }
}