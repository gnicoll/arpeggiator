import SequenceNote from '../SequenceNote'

const Sequence = ({ onClick, notes }) => {
  return (
    <div className="arp_keys_octave" >
      <SequenceNote onClick={onClick} noteNumber={notes[0]?.number} note={notes[0]?.note} />
      <SequenceNote onClick={onClick} noteNumber={notes[1]?.number} note={notes[1]?.note} />
      <SequenceNote onClick={onClick} noteNumber={notes[2]?.number} note={notes[2]?.note} />
      <SequenceNote onClick={onClick} noteNumber={notes[3]?.number} note={notes[3]?.note} />
      <SequenceNote onClick={onClick} noteNumber={notes[4]?.number} note={notes[4]?.note} />
      <SequenceNote onClick={onClick} noteNumber={notes[5]?.number} note={notes[5]?.note} />
      <SequenceNote onClick={onClick} noteNumber={notes[6]?.number} note={notes[6]?.note} />
      <SequenceNote onClick={onClick} noteNumber={notes[7]?.number} note={notes[7]?.note} />
      <SequenceNote onClick={onClick} noteNumber={notes[8]?.number} note={notes[8]?.note} />
      <SequenceNote onClick={onClick} noteNumber={notes[9]?.number} note={notes[9]?.note} />
      <SequenceNote onClick={onClick} noteNumber={notes[10]?.number} note={notes[10]?.note} />
      <SequenceNote onClick={onClick} noteNumber={notes[11]?.number} note={notes[11]?.note} />
    </div>
  )
}

export default Sequence

// 