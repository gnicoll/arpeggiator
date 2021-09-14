import style from './index.css';
import Key from '../Key'

const Octave = ({ onClick, octaveNumber }) => {

  //The note(s) you wish to play. 
  //The notes can be specified in one of two ways. 
  //The first way is by using the MIDI note number (an integer between 0 and 127). 
  //The second way is by using the note name followed by the octave (C3, G#4, F-1, Db7). 
  //The octave range should be between -2 and 8. The lowest note is C-2 (MIDI note number 0) 
  //and the highest note is G8 (MIDI note number 127). 
  //It is also possible to specify an array of note numbers and/or names.


  //Middle C should be 60

  let octave = (octaveNumber-1)<2?2:(octaveNumber-1)

  return (
    <div className="arp_keys_octave" >
      <Key onClick={onClick} noteNumber={0 +((octave)*12)} note={"C"+octave} />
      <Key onClick={onClick} noteNumber={1 +((octave)*12)} note={"C#"+octave} sharp />
      <Key onClick={onClick} noteNumber={2 +((octave)*12)} note={"D"+octave} />
      <Key onClick={onClick} noteNumber={3 +((octave)*12)} note={"D#"+octave} sharp />
      <Key onClick={onClick} noteNumber={4 +((octave)*12)} note={"E"+octave} />
      <Key onClick={onClick} noteNumber={5 +((octave)*12)} note={"F"+octave} />
      <Key onClick={onClick} noteNumber={6 +((octave)*12)} note={"F#"+octave} sharp />
      <Key onClick={onClick} noteNumber={7 +((octave)*12)} note={"G"+octave} />
      <Key onClick={onClick} noteNumber={8 +((octave)*12)} note={"G#"+octave} sharp />
      <Key onClick={onClick} noteNumber={9 +((octave)*12)} note={"A"+octave} />
      <Key onClick={onClick} noteNumber={10+((octave)*12)} note={"A#"+octave} sharp />
      <Key onClick={onClick} noteNumber={11+((octave)*12)} note={"B"+octave} />
    </div>
  )
}

export default Octave

// 