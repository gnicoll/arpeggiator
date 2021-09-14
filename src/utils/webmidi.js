import WebMidi from 'webmidi'

class Loop {
    constructor(arp, note, midiOutput) {
        this.note = note;
        this.arp = arp;
        this.midiOutput = midiOutput;
        this.arpStep = 1;
        this.step = 1;
    }
  
    // Adding a method to the constructor
    setNote(note) {
      this.note = note;
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
  
    step () {
      if (!this.midiOutput) return;
      if (this.note >= 0) {
        this.midiOutput.playNote(this.note+this.arp[this.arpStep-1], 1, {duration: 120, velocity:0.5});
      }
      this.incrementSteps();
    }
  
    getStep() {
      return this.step;
    }
  }

  export default Loop;