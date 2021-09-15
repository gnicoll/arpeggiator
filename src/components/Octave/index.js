import style from './index.css';
import Key from '../Key'

const Octave = ({ onClick, octaveNumber, onHover }) => {
  //Middle C should be 60
  let octave = (octaveNumber+1);

  return (
    <div className="arp_keys_octave" >
      <Key onClick={onClick} onHover={onHover} noteNumber={0 +((octave)*12)} note={"C"+octaveNumber} />
      <Key onClick={onClick} onHover={onHover} noteNumber={1 +((octave)*12)} note={"C#"+octaveNumber} sharp />
      <Key onClick={onClick} onHover={onHover} noteNumber={2 +((octave)*12)} note={"D"+octaveNumber} />
      <Key onClick={onClick} onHover={onHover} noteNumber={3 +((octave)*12)} note={"D#"+octaveNumber} sharp />
      <Key onClick={onClick} onHover={onHover} noteNumber={4 +((octave)*12)} note={"E"+octaveNumber} />
      <Key onClick={onClick} onHover={onHover} noteNumber={5 +((octave)*12)} note={"F"+octaveNumber} />
      <Key onClick={onClick} onHover={onHover} noteNumber={6 +((octave)*12)} note={"F#"+octaveNumber} sharp />
      <Key onClick={onClick} onHover={onHover} noteNumber={7 +((octave)*12)} note={"G"+octaveNumber} />
      <Key onClick={onClick} onHover={onHover} noteNumber={8 +((octave)*12)} note={"G#"+octaveNumber} sharp />
      <Key onClick={onClick} onHover={onHover} noteNumber={9 +((octave)*12)} note={"A"+octaveNumber} />
      <Key onClick={onClick} onHover={onHover} noteNumber={10+((octave)*12)} note={"A#"+octaveNumber} sharp />
      <Key onClick={onClick} onHover={onHover} noteNumber={11+((octave)*12)} note={"B"+octaveNumber} />
    </div>
  )
}

export default Octave

// 