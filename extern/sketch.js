let t = 0;
let changeableColorA = "#000";
let changeableColorB = "#fff";
// Recording
let isRecording = false;
let recordingFileName = `${Date.now()}`;
let recordingFrame = 0;

const settings = {
  ringCount: 18,
  ringWidth: 45,
  speed: 0.5,
  pattern: 3,
};

const pattern = (i, j, t) => {
  switch (settings.pattern) {
    case 0:
      return (
        ((j + t + sin(j * 0.5)) << 0) % 6 <
        i % (((t % (j * 0.5)) * 1.0 + 0.5) << 0)
      );

    case 1:
      return cos(i + t * 1.2) + sin((j + i) / (10 * TWO_PI)) > j % 3;

    case 2:
      return sin(PI - j * i + t * 0.1) > 0.0;

    case 3:
      return (
        (cos(t * 0.1 - 3.0 * (i / j) * sin(t * 0.3 - j * 0.05)) * j) % 10 >
        i % 7
      );
    case 4:
      return ((j - t * 2 + 0.5) << 0) % 5 <= ((i - t * 0.3 + 0.5) << 0) % 2;

    default:
      return i % 2 > j % 3;
  }
};

function setup() {
  colorMode(HSB);
  createCanvas(1000, 1000);
}

function draw() {
  const { ringCount, ringWidth, speed } = settings;
  background(
    hue(changeableColorB),
    saturation(changeableColorB),
    lightness(changeableColorB)
  );
  fill(255);
  noStroke();
  translate(width * 0.5, height * 0.5);
  for (let i = 1; i < ringCount; i++) {
    const r = ringWidth * i;
    const count = map(i, ringCount, 0, i * 10, 100);
    for (let j = 0; j < count; j++) {
      const a0 = map((j % count) / count, 0, 1, 0, TWO_PI);
      const a1 = map(((j + 1) % count) / count, 0, 1, 0, TWO_PI);
      const cx0 = (r - ringWidth) * sin(a0);
      const cy0 = (r - ringWidth) * cos(a0);
      const cx1 = r * sin(a0);
      const cy1 = r * cos(a0);
      const cx2 = (r - ringWidth) * sin(a1);
      const cy2 = (r - ringWidth) * cos(a1);
      const cx3 = r * sin(a1);
      const cy3 = r * cos(a1);
      const pat = pattern(i, j, t * map(i, 0, ringCount, 0.1, 1.0));
      pat
        ? noFill()
        : fill(
            hue(changeableColorA),
            saturation(changeableColorA),
            lightness(changeableColorA)
          );
      beginShape(QUADS);
      vertex(cx1, cy1);
      vertex(cx0, cy0);
      vertex(cx2, cy2);
      vertex(cx3, cy3);
      endShape(CLOSE);
    }
  }

  t += speed;

  if (isRecording) {
    saveCanvasToBackend("canvas", recordingFileName, recordingFrame);
    recordingFrame++;
  }
}

function changeColors() {
  const randomHue = random(0, 360);
  settings.pattern = round(random(0, 4));
  changeableColorA = color(randomHue, 45, 97);
  changeableColorB = color((randomHue + random(170, 200)) % 360, 70, 50);
  postMessageToParent("colorChange", changeableColorA);
}

function mouseClicked() {
  changeColors();
}

function postMessageToParent(message, value) {
  parent.postMessage({ type: message, value }, "*");
}

window.addEventListener("touchstart", () => {
  changeColors();
});

window.startRecording = () => {
  isRecording = true;
  recordingFileName = `${Date.now()}`;
  recordingFrame = 0;
};

window.stopRecording = () => {
  isRecording = false;
};

function saveCanvasToBackend(selector, sequence, frame) {
  const canvas = document.querySelector(selector || "canvas");
  if (canvas === null) {
    throw new Error(`No canvas element with ${selector} found`);
  }
  const dataUrl = canvas
    .toDataURL("image/png")
    ?.replace("image/png", "image/octet-stream");
  const data = {
    imageData: dataUrl,
    foldername: `${sequence}`,
    filename: `${frame}`,
    ext: "png",
  };
  fetch("http://localhost:3000", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
