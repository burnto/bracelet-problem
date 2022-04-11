const colors1 = [];
for (i = 0; i < 10; i++) {
  colors1.push([(i * 255) / 10, 70, 100]);
}

const colors2 = [];
for (i = 0; i < 5; i++) {
  colors2.push([128, 30 + i * 12, 100]);
  colors2.push([200, 30 + i * 12, 100]);
}

const colors = colors1;

function getbracelet(i, j) {
  const bracelet = [i, j];
  while (true) {
    const m = bracelet[bracelet.length - 2];
    const n = bracelet[bracelet.length - 1];
    const o = (n + m) % 10;

    if (n === i && o === j) {
      if (bracelet.length > 2) {
        bracelet.pop();
      }
      break;
    } else {
      bracelet.push(o);
    }
  }
  return bracelet;
}

let maxLength = 0;
const bracelets = [];
for (let i = 0; i <= 9; i++) {
  for (let j = 0; j <= 9; j++) {
    const n = getbracelet(i, j);
    maxLength = Math.max(n.length, maxLength);
    bracelets.push(n);
  }
}

const margin = 10;

const maxBeadSize = 40;
const maxPadSize = 5;

const canvasWidth = 600;
const canvasHeight = 500;

let displayAsCircleCheckbox;
let number1;
let number2;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noStroke();
  colorMode(HSB);
  background(255);

  createElement("br");
  displayAsCircleCheckbox = createCheckbox("Bracelet");
  number1 = createInput("0", "number");
  number1.attribute("min", 0);
  number1.attribute("max", 9);
  number2 = createInput("0", "number");
  number2.attribute("min", 0);
  number2.attribute("max", 9);
}

function draw() {
  background(255);
  let i = parseInt(number1.value(), 10) || 0;
  let j = parseInt(number2.value(), 10) || 0;
  i = constrain(i, 0, 9);
  j = constrain(j, 0, 9);

  const beads = getbracelet(i, j);

  if (displayAsCircleCheckbox.checked()) {
    drawAsBracelet(beads);
  } else {
    drawAsString(beads);
  }
}

function drawAsBracelet(bracelet) {
  const d = min(canvasWidth, canvasHeight) - 2 * margin;
  const circumference = PI * d;
  const beadSpace = circumference * 0.9;
  const paddingSpace = circumference - beadSpace;
  const beadSize = min(maxBeadSize, beadSpace / bracelet.length);
  const padSize = min(maxPadSize, paddingSpace / bracelet.length - 1);
  const braceletSize =
    beadSize * bracelet.length + padSize * (bracelet.length - 1);

  const r = max(beadSize / 4 + beadSize / 2, min(d / 2, braceletSize / TWO_PI));

  translate(canvasWidth / 2, canvasHeight / 2);

  bracelet.forEach((b, n) => {
    const angle = (n / bracelet.length) * TWO_PI;
    const x = r * Math.sin(angle);
    const y = -r * Math.cos(angle);
    push();
    translate(x, y);
    scale(beadSize / 100, beadSize / 100);
    drawBead(b);
    pop();
  });
}

function drawAsString(bracelet) {
  const availableSpace = canvasWidth - 2 * margin;
  const beadSpace = availableSpace * 0.9;
  const paddingSpace = availableSpace - beadSpace;
  const beadSize = min(maxBeadSize, beadSpace / bracelet.length);
  const padSize = min(maxPadSize, paddingSpace / bracelet.length - 1);
  const braceletSize =
    beadSize * bracelet.length + padSize * (bracelet.length - 1);
  translate((canvasWidth - braceletSize) / 2, canvasHeight / 2);
  bracelet.forEach((b, n) => {
    push();
    translate(n * (beadSize + padSize) + beadSize / 2, 0);
    scale(beadSize / 100, beadSize / 100);
    drawBead(b);
    pop();
  });
}

function drawBead(b) {
  textSize(80);
  fill(colors[b]);
  circle(0, 0, 100);
  fill(0);
  text(b, -20, 28);
}
