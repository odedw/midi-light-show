import './index.css';
declare var WebMidi: any;
let input;
const collectButton = document.getElementById('collect-btn');
const startButton = document.getElementById('start-btn');
const color = document.getElementById('color');
let isCollecting = false;
collectButton.addEventListener(
    'click',
    function() {
        collectButton.innerText = isCollecting ? 'Collect' : 'Stop Collecting';
        if (isCollecting) stopCollecting();
        else collect();
        isCollecting = !isCollecting;
    },
    false
);

startButton.addEventListener('click', start, false);
const list = document.getElementById('notes-list');
type NoteOnEvent = {
    channel: number;
    note: {
        number: number;
        name: string;
        octave: number;
    };
};
WebMidi.enable((err: Error) => {
    if (err) {
        console.log('WebMidi could not be enabled.', err);
        return;
    }

    input = WebMidi.getInputByName('Arturia BeatStep Pro');
});

let notes: Set<number> = new Set<number>();
function collect() {
    list.innerHTML = '';
    input.addListener('noteon', 'all', function(e: NoteOnEvent) {
        console.log('--------------------');

        if (!notes.has(e.note.number)) {
            notes.add(e.note.number);
            var newLI = document.createElement('li');
            newLI.appendChild(document.createTextNode(`${e.note.number} ${e.note.name}`));
            list.appendChild(newLI);
        }
    });
}

function stopCollecting() {
    input.removeListener('noteon');
}

function start() {
    color.style.display = 'block';
    let entries = Array.from(notes);
    let current = entries[0];
    let currentIndex = 0;
    input.addListener('noteon', 'all', function(e: NoteOnEvent) {
        if (e.note.number == current) colorChange();
        else if (e.note.number == entries[entries.length - 1]) {
            currentIndex = currentIndex + 1;
            if (currentIndex == entries.length - 1) currentIndex = 0;
            current = entries[currentIndex];
            console.log('trigger switch');
        }
    });
}

let colors = [ '#001f3f', '#0074D9', '#7FDBFF', '#39CCCC', '#3D9970', '#2ECC40', '#01FF70', '#FFDC00' ];
let currentColor = 0;
function colorChange() {
    console.log('color change');
    currentColor++;
    if (currentColor == colors.length) currentColor = 0;
    color.style.backgroundColor = colors[currentColor];
}
