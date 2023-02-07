function reactOnMessageFromIFrame(event) {
  console.group("Event from iframe");
  console.log(`${event}`);
  console.groupEnd();
  const {
    data: { type, value },
  } = event;

  switch (type) {
    case "colorChange": {
      const [r, g, b, _] = value.levels;
      document.documentElement.style.setProperty(
        "--color-background",
        `rgb(${r - 10}, ${g - 10}, ${b - 10})`
      );
      document.documentElement.style.setProperty(
        "--color-foreground",
        `rgb(${255 - r}, ${255 - g}, ${255 - b})`
      );
      break;
    }
  }
}

const sketchIframe = document.querySelector("#sketch");
if (window.addEventListener) {
  // For standards-compliant web browsers
  window.addEventListener("message", reactOnMessageFromIFrame, false);
} else {
  window.attachEvent("onmessage", reactOnMessageFromIFrame);
}

window.addEventListener("touchstart", () => {
  console.log("Touch");
});
