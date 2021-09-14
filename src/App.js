import WebMidi from 'webmidi';
import React, { useEffect, useCallback  } from 'react';
import './App.css';
//import Loop from './utils/webmidi';
import Keyboard from './components/Keyboard';
import * as Tone from 'tone'
//require('./workers/looper')

class Loop {
  constructor(a, s, n, arp) {
      this.arpStep = a;
      this.step = s;
      this.notes = n;
      this.arp = arp;
  }

  // Adding a method to the constructor
  setNote(note) {
    if (this.notes.count===1){
      this.notes[0].number = note;
    } else { 
      this.notes.push({number :note});
    }
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
        note: -1,
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
      playDetails.note = actualNote;
    }
    if (this.synthOutput && actualNote > -1) {
      const now = Tone.now()
      //need to lookup note name from number in actualNote for synth
      this.synthOutput.triggerAttackRelease("C4", '.120s', now);
    }
    if (this.midiOutput && actualNote > -1) {
      this.midiOutput.playNote(actualNote, 1, {duration: 120, velocity:0.5});
    }
    this.incrementSteps();

    return playDetails;
  }

  getStep() {
    return this.playStep;
  }
}

function App() {

  //notes = array of 16 notes
  const [notes, setNotes] = React.useState([{number:-1}, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]);
  //playedStep = index of the notes array that arpLoop last played
  const [playedStep, setPlayedStep] = React.useState(-1);
  //editingStep = index of notes array that the next clicked key should go into
  const [editingStep, setEditingStep] = React.useState(0);
  const [playedArpStep, setPlayedArpStep] = React.useState(-1);
  const [play, setPlay] = React.useState(true);

  const [playedNote, setPlayedNote] = React.useState(-1);
  const [noteNumber, setNoteNumber] = React.useState(-1);
  const [noteName, setNoteName] = React.useState('');
  //const [arp, setArp] = React.useState([0, 4, 7, 11, 7, 4]);
  //const [arpStep, setArpStep] = React.useState(1);
  const [midiOutput, setMidiOutput] = React.useState();
  const [midiInput, setMidiInput] = React.useState();

  
  const [arpLoop, setArpLoop] = React.useState(new Loop(1, 0, [{number:-1}], {pattern:[0]}));
//  let arpLoop = new Loop(1, 0, [{number:-1}], {pattern:[0]});
  
  
  useEffect(() => {
    //var worker = new Worker('looper.js');
    //var worker = new Worker('http://localhost:3000/static/js/C:/gnicoll/code/arpeggiator/arpeggiator/src/workers/looper.js');
    
    //worker.addEventListener('message', function(e) {
    //  console.log(e.data);
    //});
    
    //NTS-1 digital kit 1 SOUND


    //arpLoop.arp = {pattern:[0]};  
//          arpLoop.arp.pattern = [0, 4, 7, 11, 7, 4];
//          arpLoop.arp.pattern = [0, 4, 7, 11, 11, 7, 4, 0];
//          arpLoop.arp.pattern = [0, 12, -12, undefined];
//          arpLoop.arp.pattern = [0, 4, 7, 11, -12, -8, -5, -1];
//            arpLoop.arp.pattern = [0, 5, 9, 14];
    arpLoop.arp.pattern = [0, undefined, undefined, undefined,undefined,undefined,undefined,undefined];
    //arpLoop.arp.pattern = [0, 5, 3, 4];
    arpLoop.notes = notes;

    WebMidi.enable(function (err) {
    
      if (err) {
        console.log('there was an error:', err);
      } else {
        console.log("WebMidi enabled!");
        console.log(WebMidi.outputs);
        console.log(WebMidi.inputs);
      }

      

      WebMidi.outputs.forEach(function(output){
        if (output.name === 'NTS-1 digital kit 1 SOUND'){
//        if (output.name === 'CRAVE'){

          console.log('Setting Midi Output');
          setMidiOutput(output);   
          arpLoop.midiOutput = output;
          //Tone.start();
          //setArpLoop(sequencerLoop);      
          output.playNote(60, 1, {duration: 180, velocity:0.5});

        }
      });

      // Retrieve an input by name, id or index
      var input = WebMidi.getInputByName("NTS-1 digital kit 1 KBD/KNOB");
      //var input = WebMidi.getInputByName("CRAVE");
      if (input) {

        setMidiInput(input);   
        //input = WebMidi.getInputById("1809568182");
        //input = WebMidi.inputs[0];
        
        // Listen for a 'note on' message on all channels
        /*
        input.addListener('noteon', "all",
        function (e) {
          step();  
        }
        );//*/
      }
      //startLoop();

      //loopingStep()
    });//*/
  }, []);

  
  useEffect(() => {
    arpLoop.synthOutput = new Tone.Synth().toDestination();
    loopingStep();
  }, [arpLoop, loopingStep]);

  const assignNote = useCallback((num , n) => {
    if (notes.length===1 && notes[0].number === -1){
      notes[0] = {number:num};
    } else {
      //push into editing
      notes[editingStep] = {number:num};
      if (editingStep+1 < notes.length)
        setEditingStep(editingStep+1);
    }
    //arpLoop.synthOutput.triggerAttackRelease(n, "8n");
    setNoteName(n);
    setNoteNumber(num);
    if (arpLoop)
      arpLoop.setNote(num);
    //clearInterval(arpLoop);
    //midiOutput.sendReset();
    //if (midiOutput)
    //  midiOutput.playNote(num, 1, {duration: 120, velocity:0.5});
  }, [arpLoop, notes]);

  /*
  const loopStep2 = useCallback(() => {
    arpLoop.playStep();
    setTimeout(()=>loopStep(), 1800);
  }, [arpLoop]);//*/

  function step() {
    let played = arpLoop.getStep().bind(arpLoop)();
    setPlayedNote(played.note);
    setPlayedStep(played.arpStep);
  }

  function loopingStep() {
    step();
    setTimeout(()=>loopingStep(), 180);
  }
  function clickPlayHandler(setTo){
    setPlay(setTo);
    if (!setTo)
      setPlayedArpStep(-1);
  }

  return (
  <div className="App arp">
    <div className="arp_keyboard">
      <div className="arp_keyboard_interface">
        <div className='arp_keyboard_brand'>
          Looper
        </div>
        <div className='arp_keyboard_outputs'>
          output: {midiOutput?.name}<br/>
        </div>
        <div className='arp_keyboard_arps'>
        </div>
        <div className='arp_keyboard_controls'>
          <div onClick={() => clickPlayHandler(true)} className={"play "+(playedArpStep!==-1 ? "play--on" : "")}></div>
          <div onClick={() => clickPlayHandler(false)} className={"stop "+(playedArpStep===-1 ? "stop--on" : "")}></div>
          <div className={"led "+(playedArpStep%2===0 ? "led--on" : "")}></div>
        </div>
      </div>
      <div className={"arp_keys arp_keys--playing_"+playedNote}>
        <div className="arp_keys_shadow"></div>
        <Keyboard onClick={assignNote} />
      </div>
    </div>
    <div>
      note: {noteName} ({noteNumber})<br/>
      output: {midiOutput?.name}<br/>
      input: {midiInput?.name}<br/>
    </div>
    <div>
      {notes?.map((n, index) => {
        return (<span key={index}>{n?.number}, </span>
        )
      })}
    </div>
    played note: {playedNote}
    <div>
      <select value={midiOutput} name="outputs" id="outputs">
        {
          WebMidi?.outputs.map((output, index) => {
                return <option key={index} value={output}>{output.name}</option>
          })
        }
      </select>
    </div>
    <div>
      <select value={midiInput} name="inputs" id="inputs">
        {
          WebMidi?.inputs.map((input, index) => {
                return <option key={index} value={input}>{input.name}</option>
          })
        }
      </select>     
    </div>          
  </div>
  );
}

export default App;
