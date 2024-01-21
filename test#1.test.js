const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const figure = new Figure();


figure.addVertex(createPoint2D(100, 100));
figure.addVertex(createPoint2D(120, 150));
figure.addVertex(createPoint2D(150, 100));
figure.addVertex(createPoint2D(150, 90));


function drawFigure(context, figure) {
  if (!(figure instanceof Figure)) {
    return undefined;
  }

  context.beginPath();

  figure.edges.forEach(vector => {
    context.moveTo(vector.start.coordinates.x, vector.start.coordinates.y);
    context.lineTo(vector.end.coordinates.x, vector.end.coordinates.y);
  });

  figure.vertexes.forEach(vertex => context.fillRect(vertex.coordinates.x - 5 / 2, vertex.coordinates.y - 5 / 2, 5, 5))

  context.stroke();

  context.beginPath();
}


const PreviousPointPosition = createCoordinates2D(0, 0);
const PreviousFigurePosition = figure.vertexes.map(vertex => createPoint2D(vertex.coordinates.x, vertex.coordinates.y));

window.onload = function () {
  canvas.oncontextmenu = event => {
    figure.addVertex(createPoint2D(event.clientX, event.clientY));

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawFigure(context, figure);

    PreviousFigurePosition.splice(0, PreviousFigurePosition.length - 1, ...figure.vertexes.map(vertex => createPoint2D(vertex.coordinates.x, vertex.coordinates.y)));

    event.preventDefault();
  }

  canvas.onmousedown = event => {
    PreviousPointPosition.x = event.clientX;
    PreviousPointPosition.y = event.clientY;

    let _index = -1;

    const selectedVertex = figure.vertexes.find((vertex, index) => {
      console.log(vertex.coordinates, createCoordinates2D(event.clientX, event.clientY));

      if (
        event.clientX >= vertex.coordinates.x - 20 &&
        event.clientX <= vertex.coordinates.x + 20 &&
        event.clientY >= vertex.coordinates.y - 20 &&
        event.clientY <= vertex.coordinates.y + 20) {
        _index = index;
        return true;
      }

      return false;
    });

    if (event.button === 1) {
      event.preventDefault();

      if (_index < 0) return undefined;

      figure.removeVertex(_index);

      context.clearRect(0, 0, canvas.width, canvas.height);
      drawFigure(context, figure);

      PreviousFigurePosition.splice(0, PreviousFigurePosition.length - 1, ...figure.vertexes.map(vertex => createPoint2D(vertex.coordinates.x, vertex.coordinates.y)));

      return undefined;
    }

    canvas.onmousemove = event => {
      if (!selectedVertex || _index < 0) return undefined;

      selectedVertex.coordinates.x = event.clientX - PreviousPointPosition.x + PreviousFigurePosition[_index].coordinates.x;
      selectedVertex.coordinates.y = event.clientY - PreviousPointPosition.y + PreviousFigurePosition[_index].coordinates.y;

      context.clearRect(0, 0, canvas.width, canvas.height);
      drawFigure(context, figure);
    }
  }

  canvas.onmouseup = () => {
    canvas.onmousemove = null;
    PreviousFigurePosition.splice(0, PreviousFigurePosition.length - 1, ...figure.vertexes.map(vertex => createPoint2D(vertex.coordinates.x, vertex.coordinates.y)));
  }

  drawFigure(context, figure);
}