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

const beadSize = 20;
const beadSpace = 2;
const beadOffset = beadSize + beadSpace;
const margin = 20;

const canvasWidth = 2 * margin + beadOffset * 100 - beadSpace;
const canvasHeight = 2 * margin + beadOffset * maxLength - beadSpace;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noStroke();
  colorMode(HSB);
  background(255);
  translate(margin, margin);
  bracelets.forEach((n, i) => {
    push();
    n.forEach((b, j) => {
      push();
      translate(i * beadOffset, j * beadOffset);
      fill(colors[b]);
      circle(beadSize / 2, beadSize / 2, beadSize);
      fill(0);
      text(b, 7, 14);
      pop();
    });
    pop();
  });
}

function draw() {}
