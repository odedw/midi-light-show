import "./index.css";
import CompositeTriggerFactory from "./TriggerFactories/CompositeTriggerFactory";
import ITriggerFactory from "./TriggerFactories/ITriggerFactory";
declare var WebMidi: any;
let input;
const collectButton = document.getElementById("collect-btn");
const startButton = document.getElementById("start-btn");
const color = document.getElementById("color");
let isCollecting = false;
collectButton.addEventListener(
  "click",
  function() {
    collectButton.innerText = isCollecting ? "Collect" : "Stop Collecting";
    if (isCollecting) stopCollecting();
    else collect();
    isCollecting = !isCollecting;
  },
  false
);

startButton.addEventListener("click", start, false);
const list = document.getElementById("notes-list");

WebMidi.enable((err: Error) => {
  if (err) {
    console.log("WebMidi could not be enabled.", err);
    return;
  }

  input = WebMidi.getInputByName("Arturia BeatStep Pro");
});

let triggers: Set<string> = new Set<string>();
let factory: ITriggerFactory;
function collect() {
  factory = new CompositeTriggerFactory(input);

  list.innerHTML = "";
  factory.listen(trigger => {
    if (!triggers.has(trigger.key)) {
      triggers.add(trigger.key);
      const newLI = document.createElement("li");
      newLI.appendChild(document.createTextNode(trigger.key));
      list.appendChild(newLI);
    }
  });
}

function stopCollecting() {
  factory.stop();
}

function start() {
  color.style.display = "block";
  let entries = Array.from(triggers);
  let current = entries[0];
  let currentIndex = 0;
  factory.listen(t => {
    if (t.key === current) colorChange();
    else if (t.key === entries[entries.length - 1]) {
      currentIndex = currentIndex + 1;
      if (currentIndex === entries.length - 1) currentIndex = 0;
      current = entries[currentIndex];
      console.log("trigger switch");
    }
  });
}

let colors = [
  "#001f3f",
  "#0074D9",
  "#7FDBFF",
  "#39CCCC",
  "#3D9970",
  "#2ECC40",
  "#01FF70",
  "#FFDC00"
];
let currentColor = 0;
function colorChange() {
  console.log("color change");
  currentColor++;
  if (currentColor === colors.length) currentColor = 0;
  color.style.backgroundColor = colors[currentColor];
}
