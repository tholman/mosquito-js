
let context = new (window.AudioContext || window.webkitAudioContext)();

let oscillator = context.createOscillator();
oscillator.type = "sawtooth";
oscillator.frequency.setValueAtTime(750, context.currentTime);

const gainNode = context.createGain();
gainNode.connect(context.destination);

oscillator.connect(gainNode);

document.querySelector("button").onclick = () => {
  oscillator.start();
};