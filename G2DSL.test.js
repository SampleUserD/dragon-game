export class Coordinates2D {
  #_coordinates = [ 0, 0 ];

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

  set x(value) {
    if (!isNaN(Number(value))) this.#_coordinates[0] = value;
  }

  set y(value) {
    if (!isNaN(Number(value))) this.#_coordinates[1] = value;
  }
}


export class Point2D {
  #_coordinates = new Coordinates2D(0, 0);

  constructor(x, y) {
    this.coordinates = new Coordinates2D(x, y);
  }


  translate(coordinates) {
    if (coordinates instanceof Coordinates2D) {
      this.#_coordinates.x += coordinates.x;
      this.#_coordinates.y += coordinates.y;
    }
  }

  getDistanceTo(point) {
    if (point instanceof Point2D) {
      return Math.hypot(point.coordinates.x - this.coordinates.x, point.coordinates.y - this.coordinates.y);
    }

    throw new Error(`Bad type passed to "Point2D.getDistanceTo()"`);
  }


  get coordinates() {
    return Object.freeze(this.#_coordinates);
  }

  set coordinates(coordinates) {
    if (coordinates instanceof Coordinates2D) this.#_coordinates = coordinates;
  }
}


export class Segment2D {
  #_A = new Point2D(0, 0);
  #_B = new Point2D(0, 0);

  constructor(A, B) {
    if (A instanceof Point2D) this.#_A = A;
    if (B instanceof Point2D) this.#_B = B;
  }


  translate(coordinates) {
    this.#_A.translate(coordinates);
    this.#_B.translate(coordinates);
  }


  hasPoint(point) {
    if (point instanceof Point2D) {
      return this.A.getDistanceTo(point) <= this.length && this.B.getDistanceTo(point) <= this.length;
    }

    throw new Error(`Bad type passed to "Segment2D.hasPoint()"`)
  }

  hasIntersectionWith(segment) {
    if (segment instanceof Segment2D) {
      const straight_1 = StraightLineUtilites.defineByPoints(segment.A, segment.B);
      const straight_2 = StraightLineUtilites.defineByPoints(this.A, this.B);
      const intersectionPoint = straight_1.findIntersectionPoint(straight_2);

      return segment.hasPoint(intersectionPoint) && this.hasPoint(intersectionPoint) && Boolean(intersectionPoint);
    }
    
    throw new Error(`Bad type passed to "Segment2D.hasIntersectionWith()"`)
  }


  get length() {
    return this.A.getDistanceTo(this.B);
  }

  get A() {
    return this.#_A;
  }

  get B() {
    return this.#_B;
  }
}


export class Vector2D {
  #_projections = new Coordinates2D(0, 0);


  constructor(X, Y) {
    this.#_projections = new Coordinates2D(X, Y);
  }


  add(vector) {
    if (vector instanceof Vector2D) {
      return new Vector2D(vector.projections.x + this.projections.x, vector.projections.y + this.projections.y)
    }

    throw new Error(`Bad type passed to "Vector2D.add()"`);
  }

  multiple(scalar) {
    if (!isNaN(Number(scalar))) {
      return new Vector2D(vector.projections.x * scalar, vector.projections.y * scalar);
    }

    throw new Error(`Bad type passed to "Vector2D.multiple()"`);
  }

  product(vector) {
    if (vector instanceof Vector2D) {
      return this.projections.x * vector.projections.x + this.projections.y * vector.projections.y;
    }

    throw new Error(`Bad type passed to "Vector2D.product()"`);
  }

  isCollinearTo(vector) {
    if (vector instanceof Vector2D) {
      return this.projections.x / vector.projections.x == this.projections.y / vector.projections.y;
    }

    throw new Error(`Bad type passed to "Vector2D.isCollinearTo()"`);
  }


  get projections() {
    return Object.freeze(this.#_projections);
  }
}


export class StraightLine {
  #_coefficients = [ 0, 1, 0 ];

  constructor(coefficients) {
    if (Array.isArray(coefficients)) {
      this.#_coefficients = coefficients.filter(coefficient => !isNaN(Number(coefficient)));
      this.#_coefficients = this.#_coefficients.length < 3 ? [ 0, 1, 0 ] : this.#_coefficients;
    }
  }


  findIntersectionPoint(straight) {
    if (!(straight instanceof StraightLine)) {
      throw new Error(`Bad type passed to "StraightLine.findIntersectionPoint()"`);
    }

    const x = (straight.coefficients[2]/straight.coefficients[1] - this.coefficients[2]/this.coefficients[1])/
              (this.coefficients[0]/this.coefficients[1] - straight.coefficients[0]/straight.coefficients[1]);
    const y = -(straight.coefficients[0]*x + straight.coefficients[2])/straight.coefficients[1];

    return new Point2D(x, y);
  }


  get coefficients() {
    return Object.freeze(this.#_coefficients);
  }
}

class StraightLineUtilites {
  defineByPoints(point_1, point_2) {
    if (!(point_1 instanceof Point2D) || !(point_1 instanceof Point2D)) {
      throw new Error(`Bad arguments passed to "StraightLineUtilities"`);
    }

    if (point_1.coordinates.x == point_2.coordinates.x) return new StraightLine([ 1, 0, -point_1.coordinates.x ]);

    const ratio = (point_2.coordinates.y - point_1.coordinates.y)/(point_1.coordinates.x - point_2.coordinates.x);

    return new StraightLine([ ratio, 1, -ratio*point_1.coordinates.x - point_1.coordinates.y ]);
  }
}


export class Shape2D {
  #_vertexes = [];

  constructor(vertexes) {
    if (Array.isArray(vertexes)) {
      this.#_vertexes = vertexes.filter(vertex => vertex instanceof Point2D);
    }
  }


  addVertex(vertex) {
    if (vertex instanceof Point2D) {
      this.#_vertexes.push(vertex);
    }
  }

  removeVertex(index) {
    if (!isNaN(Number(index))) {
      this.#_vertexes.splice(index, 1);
    }
  }


  translate(coordinates) {
    this.#_vertexes.forEach(vertex => vertex.translate(coordinates));
  }

  hasCollisionWith(shape) {
    if (shape instanceof Shape2D) {
      return shape.edges.some(edge => this.edges.some(_edge => edge.hasIntersectionWith(_edge)));
    }

    throw new Error(`Bad type passed to "Shape2D.hasCollisionWith()"`)
  }


  get vertexes() {
    return Object.freeze(this.#_vertexes);
  }

  get edges() {
    return this.#_vertexes.map((vertex, index) => new Segment2D(vertex, this.vertexes[(index + 1)%this.vertexes.length]));
  }
}


export function createGeometryObject2D(type, parameters) {
  switch (type.toLowerCase()) {
    case "straight-line": return new StraightLine(...parameters); break;
    case "coordinates": return new Coordinates2D(...parameters); break;
    case "segment": return new Segment2D(...parameters); break;
    case "vector": return new Vector2D(...parameters); break;
    case "point": return new Point2D(...parameters); break;
    case "shape": return new Shape2D(...parameters); break;
    default:
      throw new Error(`Geometry object "${ type.toLowerCase() }" does not exist`);
  }
}

export function isGeometryObject2D(expectedType, object) {
  return object.__proto__ == createGeometryObject2D(expectedType, []).__proto__;
}