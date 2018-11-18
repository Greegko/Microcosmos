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
    if(config.spacing * (column + 1) + config.size > board.width){
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

const config = { size: 25, lines: 1, angle: 96, repetation: 5, spacing: 45, heightspacing: 45 };

function updateProperties(event) {
  const prop = event.target.name;
  config[prop] = parseInt(event.target.value);
  document.getElementById(prop +'_value').innerHTML = event.target.value;
  render(config);
}

function onResize() {
  board.width = window.innerWidth;
  render(config);
}

document.querySelector('input[name=size]').addEventListener('input', updateProperties);
document.querySelector('input[name=lines]').addEventListener('input', updateProperties);
document.querySelector('input[name=angle]').addEventListener('input', updateProperties);
document.querySelector('input[name=repetation]').addEventListener('input', updateProperties);
document.querySelector('input[name=spacing]').addEventListener('input', updateProperties);
document.querySelector('input[name=heightspacing]').addEventListener('input', updateProperties);

window.addEventListener('resize', onResize);

render(config);