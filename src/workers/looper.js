/* eslint-disable no-restricted-globals */
import WebMidi from 'webmidi';

class Loop {
    constructor(a, s, n) {
        this.arpStep = a;
        this.step = s;
        this.note = n;
    }
  
    // Adding a method to the constructor
    setNote(note) {
      this.note.number = note;
    }
    setArp(arp) {
      this.arp = arp;
      this.arpStep = 1;
      
    }
    incrementSteps() {
        this.arpStep = this.arpStep+1;
        if (this.arpStep > this.arp.length){
          this.arpStep = 1;
        }
        this.step = this.step+1;
        if (this.step > 16) {
          this.step=1;
        }
    }
  
    playStep() {
        const playDetails = {
            note: -1,
            duration: 120,
            arp: this.arp,
            arpStep: this.arpStep-1,
        }

      if (!this) return playDetails;
      if (this.synthOutput) {
        //const now = Tone.now()
        //this.synthOutput.triggerAttackRelease("C4", '.120s', now);
      }
      if (this.midiOutput) {
        if (this.note.number >= 0) {
          let actualNote = this.note.number+this.arp[this.arpStep-1];
          playDetails.note = actualNote;
          this.midiOutput.playNote(actualNote, 1, {duration: 120, velocity:0.5});
        }
      }
      this.incrementSteps();

      return playDetails;
    }
  
    getStep() {
      return this.playStep;
    }
  }

  let arpLoop = new Loop(1, 1, {number:-1});


  WebMidi.enable(function (err) {
    
    if (err) {
      console.log('there was an error:', err);
    } else {
      console.log("WebMidi enabled!");
    }
    WebMidi.outputs.forEach(function(output){
      if (output.name === 'NTS-1 digital kit 1 SOUND'){

        console.log('Setting Midi Output');
        //setMidiOutput(output);     
        //arpLoop.arp = [0, 4, 7, 11, 7, 4];
        arpLoop.arp = [0, 4, 7, 11, -12, -8, -5, -1, -5, -8, -12];
        //arpLoop.arp = [0, 4, 7, 11, 7, 4, 1,5,8,12,8,5,0, 4, 7, 11, 7, 4,2,6,9,13,9,6];
        arpLoop.note = -1;
        arpLoop.midiOutput = output;
        //arpLoop.synthOutput = new Tone.Synth().toDestination();
        //Tone.start();
        //setArpLoop(sequencerLoop);      
        output.playNote(64, 1, {duration: 120, velocity:0.5});

        loopStep()
      }
    });

    //startLoop();

  });

  function loopStep() {
    //arpLoop.getStep().bind(arpLoop)();
    self.postMessage(arpLoop.getStep().bind(arpLoop)());
    setTimeout(()=>loopStep(), 180);
  }

self.addEventListener('message', function(e) {
    arpLoop.note = e.data;
    let n = e.data;
});
