import style from './index.css';
import SequenceNote from '../SequenceNote'

const Sequence = ({ onClick, onHover, notes }) => {
  
  const sequenceSteps = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

  return (
    <div className="arp_sequencesteps" >
      {sequenceSteps.map((stepNum, index) => 
        <SequenceNote 
          key={index} 
          onHover={onHover} 
          onClick={onClick} 
          stepNum={stepNum} 
          noteNumber={notes[stepNum]?.number} 
          note={notes[stepNum]?.name} 
          
        />
      )}
    </div>
  )

}

export default Sequence

// 