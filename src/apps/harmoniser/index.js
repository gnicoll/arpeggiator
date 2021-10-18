import WebMidi from "webmidi";
import React, { useEffect, useCallback  } from 'react';
import './App.css';
import Keyboard from '../../components/Keyboard';
import Sequence from '../../components/Sequence';
import ArpCreator from '../../components/ArpCreator';
import * as Tone from 'tone'
//require('./workers/looper')
import Loop from '../../classes/loop'


function ArpApp() {

  //notes = array of 16 notes
  const [highlightNote, setHighlightNote] = React.useState(undefined);
  const [playedNote, setPlayedNote] = React.useState(-1);

  const [noteNumber, setNoteNumber] = React.useState(-1);
  const [noteName, setNoteName] = React.useState('');

  const [midiOutput, setMidiOutput] = React.useState();
  const [midiInput, setMidiInput] = React.useState();
  
  const [arpList, setArpList] = React.useState([]);
  const [selectedArp, setSelectedArp] = React.useState();
  const [arpSelector, setArpSelector] = React.useState();
  
  useEffect(() => {
    //var worker = new Worker('looper.js');
    //var worker = new Worker('http://localhost:3000/static/js/C:/gnicoll/code/arpeggiator/arpeggiator/src/workers/looper.js');
    
    //worker.addEventListener('message', function(e) {
    //  console.log(e.data);
    //});
    
    //arpLoop.arp = {pattern:[0]};  
    
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
//          arpLoop.midiOutput = output;
          //Tone.start();
          //setArpLoop(sequencerLoop);      
          output.playNote(60, 1, {duration: 180, velocity:0.5});

        }
      });//*/

      // Retrieve an input by name, id or index
      //var input = WebMidi.inputs[0];//WebMidi.getInputByName("NTS-1 digital kit 1 KBD/KNOB");
      var input = WebMidi.getInputByName("CRAVE");
      if (input) {

        setMidiInput(input);   
        //input = WebMidi.getInputById("1809568182");
        //input = WebMidi.inputs[0];
        
        /*
        input.addListener('noteoff', "all",
            function (e) {
                console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
            }
        );//*/
      }
      //startLoop();

      //loopingStep();
    });//*/
  }, []);


  useEffect(() => {
    if (midiInput){

        midiInput.addListener('noteon', "all",
        function (e) {
            playNote(e.note.number);
            console.log("playnote (" + e.note.number+").");
        }
        );//*/
        
        midiInput.addListener('noteoff', "all",
            function (e) {
                stopNote(e.note.number);
                console.log("stopnote (" + e.note.number+").");
            }
        );//*/
    }
    //playNote(), stopNote(),
  }, [midiInput]);

  function playNote(noteNumber){
    if (midiOutput){
        setPlayedNote(noteNumber);
        setHighlightNote(noteNumber+5);
        midiOutput.playNote(noteNumber+5, 1);
    }
  }
  function stopNote(noteNumber){
    if (midiOutput){
        //setPlayedNote(undefined);
        //setHighlightNote(undefined);
        midiOutput.stopNote(noteNumber+5, 1);
    }
  }

  function handleSelectArp(a){
    setSelectedArp(a);
  }

  return (
  <div className="App arp">
    <div className="arp_keyboard">
      <div className="arp_keyboard_interface">
        <div className='arp_keyboard_brand'>
          Harmoniser
        </div>
        <div className='arp_keyboard_outputs'>
          {midiOutput?.name}<br/>
        </div>
        <div className='arp_keyboard_arps'>
        </div>
        <div className='arp_keyboard_controls'>
          
        </div>
      </div>
      <div className={'arp-keyboard-rest arp-keys-playing_'+playedNote+' arp-keys-highlighting_'+highlightNote}>
        
        
      </div>
      <Keyboard playedNote={playedNote} highlightNote={highlightNote} />
    </div>
    <div>
      input: {midiInput?.name}<br/>
    </div>
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

export default ArpApp;
