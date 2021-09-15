import WebMidi from 'webmidi';
import React, { useEffect, useCallback  } from 'react';
import './App.css';
import Keyboard from './components/Keyboard';
import Sequence from './components/Sequence';
import * as Tone from 'tone'
//require('./workers/looper')
import Loop from './classes/loop'


function App() {

  //notes = array of 16 notes
  const [notes, setNotes] = React.useState([undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]);
  //playedStep = index of the notes array that arpLoop last played
  const [playedStep, setPlayedStep] = React.useState(-1);
  //editingStep = index of notes array that the next clicked key should go into
  const [editingStep, setEditingStep] = React.useState(0);
  const [playedArpStep, setPlayedArpStep] = React.useState(-1);
  const [play, setPlay] = React.useState(true);

  const [highlightNote, setHighlightNote] = React.useState(undefined);
  const [playedNote, setPlayedNote] = React.useState(-1);
  const [noteNumber, setNoteNumber] = React.useState(-1);
  const [noteName, setNoteName] = React.useState('');

  const [midiOutput, setMidiOutput] = React.useState();
  const [midiInput, setMidiInput] = React.useState();

  
  const [arpLoop, setArpLoop] = React.useState(new Loop(1, 0, [], {pattern:[0]}));
  
  
  useEffect(() => {
    //var worker = new Worker('looper.js');
    //var worker = new Worker('http://localhost:3000/static/js/C:/gnicoll/code/arpeggiator/arpeggiator/src/workers/looper.js');
    
    //worker.addEventListener('message', function(e) {
    //  console.log(e.data);
    //});
    
    //arpLoop.arp = {pattern:[0]};  
    //arpLoop.arp.pattern = [0, 4, 7, 11, 7, 4];
    //arpLoop.arp.pattern = [0, 4, 7, 11, 11, 7, 4, 0];
    //arpLoop.arp.pattern = [0, 12, -12, undefined];
    //arpLoop.arp.pattern = [0, 4, 7, 11, -12, -8, -5, -1];
    //arpLoop.arp.pattern = [0, 5, 9, 14];
    arpLoop.arp.pattern = [0, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
    //arpLoop.arp.pattern = [0];
    //arpLoop.arp.pattern = [0, 5, 3, 4];
    //arpLoop.notes = notes;

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

      loopingStep();
    });//*/
  }, []);

  useEffect(() => {
    //arpLoop.synthOutput = new Tone.Synth().toDestination();
    //loopingStep();
  }, [arpLoop, loopingStep]);

  const assignNote = useCallback((num , n) => {

    let newNotes = [...notes];
    newNotes[editingStep] = {number:num, name:n};
    setNotes(newNotes);

    if (arpLoop) {
      arpLoop.setNote(num, editingStep);
    }

    let editingStepIncrement = editingStep+1;
    for (let n = 0; n < newNotes.length; n++) {
      if (!newNotes[n]) {
        editingStepIncrement = n;
        break;
      }
    }
    setEditingStep(editingStepIncrement);
    
    setNoteName(n);
    setNoteNumber(num);

    
  }, [arpLoop, notes, editingStep]);

  /*
  const loopStep2 = useCallback(() => {
    arpLoop.playStep();
    setTimeout(()=>loopStep(), 1800);
  }, [arpLoop]);//*/

  function step() {
    let played = arpLoop.getStep().bind(arpLoop)();
    setPlayedNote(played.note);
    setPlayedStep(played.step);
    setPlayedArpStep(played.arpStep);
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
  function clickSequenceHandler(setTo){
    if (editingStep > setTo)
      setEditingStep(setTo);
  }

  function hoverSequenceHandler(num){
    setHighlightNote(num)
  }

  return (
  <div className="App arp">
    <div className="arp_keyboard">
      <div className="arp_keyboard_interface">
        <div className='arp_keyboard_brand'>
          Arp Player
        </div>
        <div className='arp_keyboard_outputs'>
          {midiOutput?.name}<br/>
        </div>
        <div className='arp_keyboard_arps'>
        </div>
        <div className='arp_keyboard_controls'>
          <div onClick={() => clickPlayHandler(true)} className={"play "+(playedArpStep!==-1 ? "play--on" : "")}></div>
          <div onClick={() => clickPlayHandler(false)} className={"stop "+(playedArpStep===-1 ? "stop--on" : "")}></div>
          <div className={"led "+(playedArpStep%2===0 ? "led--on" : "")}></div>
        </div>
      </div>
      <div className={'arp-keyboard-rest arp-keys-playing_'+playedNote+' arp-keys-highlighting_'+highlightNote}>
        <div className='arp-keyboard-rest-key'  onClick={()=>assignNote(-1, 'rest')}>

        </div>
      </div>
      <Keyboard onClick={assignNote} onHover={hoverSequenceHandler} playedNote={playedNote} highlightNote={highlightNote} />
    </div>
    <div>
      <div className={"arp_sequence arp_sequence--playing_"+playedStep+" arp_sequence--highlighting_"+highlightNote}>
        <Sequence notes={notes} onHover={hoverSequenceHandler} onClick={clickSequenceHandler} />
      </div>
    </div>
    <div>
      output: {midiOutput?.name}<br/>
      input: {midiInput?.name}<br/>
    </div>
    <div>
      {notes?.map((n, index) => {
        return (<span key={index}>{n!==undefined && <>{n?.name} ({n?.number}),</>} </span>
        )
      })}
    </div>
    edit step {editingStep+1}
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
