export default class Loop {
    constructor(a, s, n, arp) {
        this.arpStep = a;
        this.step = s;
        this.notes = n;
        this.arp = arp;
    }
  
    // Adding a method to the constructor
    setNote(note, index) {
        if (index === this.notes.length)
            this.notes.push({number :note});      
        else if (index < this.notes.length)
            this.notes[index] = {number :note};
    }
    setArpPattern(arppattern) {
      this.arp.pattern = arppattern;
      this.arpStep = 1;
      
    }
    incrementSteps() {
        this.arpStep = this.arpStep+1;
        if (this.arpStep > this.arp.pattern.length){
          this.arpStep = 1;
          this.step = this.step+1;
          if (this.step >= this.notes.length) {
            this.step=0;
          }
        }
    }
  
    playStep() {
      const playDetails = {
          note: undefined,
          duration: 120,
          arp: this.arp.pattern,
          arpStep: this.arpStep-1,
          step: this.step,
      }
  
      if (!this) return playDetails;
      let actualNote = -1;
      if (
          this.notes[this.step] !== undefined && 
          this.notes[this.step].number >= 0 && 
          this.arp.pattern[this.arpStep-1] !== undefined
        ) {
        actualNote = this.notes[this.step].number+this.arp.pattern[this.arpStep-1];
        if (actualNote > 128) actualNote = 128;
        playDetails.note = actualNote;
      }
      this.getPlayNote(actualNote);
      this.incrementSteps();
  
      return playDetails;
    }
  
    getStep() {
      return this.playStep;
    }

    getPlayNote(noteNumber){
      if (this.synthOutput && noteNumber > -1) {
        //const now = Tone.now()
        //need to lookup note name from number in actualNote for synth
        this.synthOutput.triggerAttackRelease("C4", '.120s');
      }
      if (this.midiOutput && noteNumber > -1) {
        this.midiOutput.playNote(noteNumber, 1, {duration: 750, velocity:0.5});
      }
    }
  }