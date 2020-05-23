// Create Audio Context (Safari still uses the prefix here)
const context = new (window.AudioContext || window.webkitAudioContext)();

// Oscillator at 700hz frequency (I hear mosquitos are more, but this sounds right to my old ears)
const oscillator = context.createOscillator();
oscillator.type = "sawtooth";
oscillator.frequency.setValueAtTime(700, context.currentTime);

// A Gain node allows me to change the volume of our annoying 700hz sawtooth mosquito
const gainNode = context.createGain();
gainNode.connect(context.destination);

// I put another gain node to reduce the noise a ton because its insanely annoying
// This can probably be merged into the previous one, but reads easier here to me.
const lowVolumeFixedGain = context.createGain();
const lowVolumeFixedGainValue = 0.003;
lowVolumeFixedGain.gain.value = lowVolumeFixedGainValue;
lowVolumeFixedGain.connect(gainNode);

// Connect them all together.
oscillator.connect(lowVolumeFixedGain);

// So far, this makes for a boring mosquito. Now to add some variance.

// Gonna use some radians
const increase = Math.PI * 2 / 100
let sineWaveCounter = 0;

let sineWaveEffect = 0;
const gainOffset = 0.8;

// Randomly push and pull by small amounts. Used to both detune and to change the volume
const randomVariancePush = 0.02;
let randomVariance = 0;

// The real magic. There are probably better values, I tweaked these for 5 minutes
// and 5 hours later, I still feel like I have a tab open with this code in it.
const annoyingSinBasedDetuneMultiplier = 7
const annoyingRandomBasedDetuneMultiplier = 14
const annoyingSinBasedGainMultipier = 0.3
const annoyingRandomBasedGainMultiplier = 0.6

// Potato gonna Potate, Mosquito gonna mosquite
function mosquite() {
  
  // The sine wave, alternating between -1 & 1
  sineWaveEffect = Math.sin(sineWaveCounter) / 2;

  // Detune the osccilator in the sin wave pattern, and also with the random variance!
  oscillator.detune.value = sineWaveEffect * annoyingSinBasedDetuneMultiplier + randomVariance * annoyingRandomBasedDetuneMultiplier;

  // Change the volume also based on these sin wave, and the random variance
  gainNode.gain.value = sineWaveEffect * annoyingSinBasedGainMultipier + gainOffset + randomVariance * annoyingRandomBasedGainMultiplier;

  // Another push or pull, based on random numbers. Just adding more random to the sound system really
  // otherwise it sounds like a mosquito going back and forth in a wonderfully succinct, nicely eased pattern
  randomVariance += Math.random() > 0.5 ? randomVariancePush : -randomVariancePush;
  if (randomVariance < -0.6) {
    // Don't let it get too far away
    randomVariance = -0.6;
  } else if (randomVariance > 0.4) {
    // Or too close
    randomVariance = 0.4;
  }

  // Increase the sin wave, but be a little weird here and there.
  // Sometimes sit flat, and sometimes go slightly backwards
  //
  // Trying to mimic the brain of a mosquito trying to figure out the meaning of life
  // (I also use this method to try to figure out the meaning of life)
  if (Math.random() > 0.4) {
    sineWaveCounter += increase;
  } else if (Math.random() > 0.5) {
    sineWaveCounter -= increase;
  }

  requestAnimationFrame(mosquite);
}

/**
 * Interface Stuff, and other things that were also slightly painful to code
**/

//
//                 . '  .
//                ' .( '.) '
//        _     ('-.)' (`'.) '
//       |0|- -(. ')`( .-`) (-')
//    .--`+'--.  .  (' -,).(') .
//    |`-----'|   (' .) - ('. )
//    |       |    . (' `.  )
//    |  .-.  |       ` .  `
//    | (0.0) |
//    | >|=|< |
//    |  `"`  |
//    |       |
//    |       |
//    `-.___.-'
//
// I found this cool ascii art online, it helped distract me from coding for a few minutes.

let isStopped = true
let animationFrame

// For some reason, you cannot call start/stop multiple times on an oscilator.
// Quick searches reveal very little. Something real-world mechanical I'm assuming. (trade secret?)
// 
// I'm going to use this variable here to disconnect and reconnect the oscillator instead. Giving me that strange feeling;
// in my stomach that some of my code is running endlessly even after I've told it to stop. 
// 
// Might not sleep tonight.
let hasBeenStarted = false
let clapAudio

// Start the mosquito on click/tap
// Its annoying how much logic is in here.
let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
const buttonTextNode = document.querySelector(".buttonText");
const missButton = document.getElementById('miss');
document.querySelector("button").addEventListener(touchEvent, () => {
  if( isStopped ) {
    if( !hasBeenStarted ) {
      clapAudio = new Audio('./assets/clap.mp3');
      clapAudio.volume = 0.07 // WHY 0.07!? Because I can't tell if the mosquito noise is soft or the clap is loud
      oscillator.start();  
      hasBeenStarted = true
    } else {
      oscillator.connect(lowVolumeFixedGain);
    }
    animationFrame = requestAnimationFrame(mosquite);
    buttonTextNode.innerText = "Clap the mosquito out of existence";
    missButton.style.display = 'inline';
  } else {
    clapAudio.play()
    oscillator.disconnect(lowVolumeFixedGain);
    cancelAnimationFrame(animationFrame);
    buttonTextNode.innerText = "Activate the mosquito";
    missButton.style.display = 'none';
  }
  isStopped = !isStopped
});

missButton.addEventListener(touchEvent, () => {
  clapAudio.play();
  lowVolumeFixedGain.gain.cancelScheduledValues(context.currentTime);
   // it's scared and runs aways
  lowVolumeFixedGain.gain.setTargetAtTime(0.000001, context.currentTime, 0);
  // aaaand it's back after 1 to 5 seconds
  lowVolumeFixedGain.gain.setTargetAtTime(
    lowVolumeFixedGainValue, 
    context.currentTime + (Math.random() * 4 + 1),
    10
  );
});
