import { ICoordinates2D } from '../Coordinates/ICoordinates.interface.js';
import { IPoint2D } from '../Point/IPoint.interface.js';


export class StraightLineUtilites {
  static define(point_1, point_2) {
    if (!(point_1 instanceof IPoint2D) || !(point_2 instanceof IPoint2D)) return [ NaN, NaN, NaN ];
    if (point_1.coordinates.x == point_2.coordinates.x) return [ 1, 0, -point_1.coordinates.x ];

    const ratio = (point_2.coordinates.y - point_1.coordinates.y)/(point_1.coordinates.x - point_2.coordinates.x);

    return [ ratio, 1, -ratio*point_1.coordinates.x - point_1.coordinates.y ];
  }

  static is(supposedStraightLine) {
    if (!Array.isArray(supposedStraightLine)) {
      return false;
    }

    const straightLine = supposedStraightLine.filter(coefficient => !isNaN(parseInt(coefficient)));

    return straightLine.length === 3;
  }

  static findIntersectionPoint(straight_1, straight_2) {
    if (!StraightLineUtilites.is(straight_1) || !StraightLineUtilites.is(straight_2)) {
      throw new Error(`Bad arguments instead of "straight lines"`);
    }

    if (straight_1[1] === 0) {
      const x = -straight_1[2]/straight_1[0];
      const y = (straight_2[0]/straight_1[0] - straight_2[2]/straight_1[2])/(straight_2[1]/straight_1[2]);
      
      return new IPoint2D(new ICoordinates2D(x, y));
    }

    if (straight_2[1] === 0) {
      const x = -straight_2[2]/straight_2[0];
      const y = (straight_1[0]/straight_2[0] - straight_1[2]/straight_2[2])/(straight_1[1]/straight_2[2]);
      
      return new IPoint2D(new ICoordinates2D(x, y));
    }

    const x = (straight_2[2]/straight_2[1] - straight_1[2]/straight_1[1])/(straight_1[0]/straight_1[1] - straight_2[0]/straight_2[1]);
    const y = -(straight_2[0]*x + straight_2[2])/straight_2[1];
    
    return new IPoint2D(new ICoordinates2D(x, y));
  }
}