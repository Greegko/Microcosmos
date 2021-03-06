const board = document.getElementById('board');
const boardctx = board.getContext('2d');

const Shapes = [
  [0, 1, -60, 0, 1],
  [1, 1, 180, 60, 2],
  [1, 1, 180, 60, 3],
  [0, 0, 0, 90, 4],
  [0, 0, 0, 108, 5],
  [0, 0, 0, 120, 6]
]

function render(config) {
  boardctx.clearRect(0, 0, board.width, board.height);
  const shapeLineDef = Shapes[config.lines - 1];
  
  for(var i = 0, column = 0, row = 0; i < config.repetation; i++, column++) {
    const shapeCanvas = drawShape(shapeLineDef, config.angle * i, config.size);
    if(config.spacing * (column + 2) + config.size > board.width){
      row++;
      column = 0;
    }
    boardctx.drawImage(shapeCanvas, config.spacing * column, row * config.heightspacing);
  }
}

function drawShape(lineDef, lineAngle, Unit) {
  var shapeCanvas = document.createElement('canvas');
  shapeCanvas.width = board.width;
  shapeCanvas.height = board.height;
  var ctx = shapeCanvas.getContext('2d');

  const [starterX, starterY, startAngle, angle, lines] = lineDef;

  ctx.beginPath();
  ctx.translate(Unit, Unit);
  ctx.moveTo(starterX * Unit, starterY * Unit);
  ctx.translate(starterX * Unit, starterY * Unit);
  ctx.rotate(startAngle * Math.PI / 180);

  const line = lineCanvas(lineAngle, Unit);
  for(var i = 0; i < lines; i++) {
    ctx.translate(0, -Unit / 2);
    ctx.drawImage(line, 0, 0);
    ctx.translate(Unit, Unit / 2);
    ctx.rotate((180-angle) * Math.PI / 180);
  }
  
  ctx.stroke();

  return shapeCanvas;
}

function lineCanvas(angle, Unit) {
  var lineCanvas = document.createElement('canvas');
  lineCanvas.width = Unit;
  lineCanvas.height = Unit;
  var ctx = lineCanvas.getContext('2d');
  ctx.translate(Unit / 2, Unit / 2);
  ctx.rotate(angle * Math.PI / 180);
  ctx.translate(-Unit / 2, 0);
  ctx.moveTo(0, 0);
  ctx.lineTo(Unit, 0);
  ctx.stroke();

  return lineCanvas;
}

const config = { size: 48, lines: 1, angle: 10, repetation: 100, spacing: 54, heightspacing: 51 };

function updateProperties(event) {
  const prop = event.target.name;
  const val = parseInt(event.target.value);
  config[prop] = val;
  document.getElementsByName(event.target.name).forEach((node) => node.value = val);
  render(config);
}

function addInputHook(name) {
  document.getElementsByName(name).forEach(
    (node) => node.addEventListener('input', updateProperties)
  );
}

addInputHook('size');
addInputHook('lines');
addInputHook('angle');
addInputHook('repetation');
addInputHook('spacing');
addInputHook('heightspacing');

render(config);