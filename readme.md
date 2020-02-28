# Mosquito JS

A JavaScript Mosquito. This proved too painful to continue and quickly eroded my sanity levels. Wrapped it up as fast as possible. You an [see it here](http://tholman.com/mosquito-js). I shall not return to it. My descent into madness is logged below, as well as in the [code comments](https://github.com/tholman/mosquito-js/blob/master/mosquito/mosquito.js).

## How it went down

**The 0th minute:**  
Created the repo and a readme [plotting out my ideas](https://github.com/tholman/mosquito-js/commit/a684f6e621cc144c5d3e3dd34cb9305309476c3a). They included creating the noise a mosquito makes as it flies around with the web audio API, and then elaborate plans to tie it in with user interaction, and have an API for multiple mosquitos or mosquito breeds.

**The 20th minute:**  
*Success!* After getting an oscillator connected up [I had created life](https://github.com/tholman/mosquito-js/commit/717bee29ad464a26f73eea73a28d1fff5910b03d). I played around with oscillator types and found the sawtooth best represented a mosquito to me. Some research told me that mosquito noises were in the 17.4 kHz range, but that didn't really match what I was hearing.

**The 30th minute:**  
Signs of insanity starting to click in. I needed to code an off button, and it's unclear why I didn't start with one. For some reason you can call `oscillator.start()` then `oscillator.stop()` but they will not then allow you to call `oscillator.start()` again. I can't really understand why, but I've taken to disconnect and reconnect the oscillator to stop and start it. **Now whenever I stop the mosquito noise, I have a deep feeling in the pit of my stomach that it continues somewhere in the distance, unheard.** I must persevere.

**The 35th minute:**  
I've [added a clap noise](https://github.com/tholman/mosquito-js/commit/db4578489880e10f148218c2d319b93adcdcca9d) when I disconnect the oscillator to give me comfort that the mosquito has been squished. It helps.

**The 45th minute:**  
*The mosquito is becoming real.* I've created a function that detunes the frequency slightly at 60 times a second in a smooth sine wave. Now it buzzes closer and further away from my ears. I have twice closed all my tabs to make sure I've stopped the noise. I'm now acutely aware of every fan in the house.

**The 55th minute:**  
Is it possible to awaken a sleeping case of tinnitus?

**The 60th minute:**  
I've added another variable to randomly modulate and detune the volume and frequencies along with the sine wave. I don't think there are any rhyme and reason to this devilish sound. Every now and when I stop it, I fear that something has landed on me, and check my exposed legs.

**The 75th minute:**  
As I start to extract the mosquito code into a function, so I can create multiple of them, I decide I've had enough and shouldn't do this anymore. It's completely pointless. I keep blocking my ears to see if the noise is inside my head or not. [I cross out](https://github.com/tholman/mosquito-js/commit/a36de0b35812a9358d4e503decb0536755259ffc) any other plans. And will end this project in the morning.

**The middle minutes:**  
It's insane, but [this is the FitBit recording](http://tholman.com/mosquito-js/sleep.png) of my sleep this night. The heartbeat goes DOWN when I wake up. No lies.

**The morning after:**  
I dreamed of mosquitos. I can't bear to run the mosquito for more than 1 second intervals, just to ensure that it's running. I've built a quick and [simple page for it](http://tholman.com/mosquito-js) and have [annotated the javascript](https://github.com/tholman/mosquito-js/blob/master/mosquito/mosquito.js) lest some braver soul wishes to pick up this burden. I have called it quits.

When times are bad, I can look at this graph and at least know that we have come a long way since the 1900's.

![graph of mosquito word usage over time](http://tholman.com/mosquito-js/mosquito-use-over-time.png)

## Licenses
Clap MP3 - Licenced /w (CC BY 4.0) (via https://www.freesoundslibrary.com/)  
Code - Licensed /w (MIT)
