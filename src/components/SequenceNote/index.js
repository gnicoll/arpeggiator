import style from './index.css';

const SequenceNote = ({ onClick, note, stepNum, noteNumber }) => {
    function clickHandler(num, n){
        onClick(num, n)
    }

    return (
      <div className={"arp_sequencenote " +"arp_sequencenote_"+noteNumber +" arp_sequencenote_step"+stepNum} onClick={() => clickHandler(stepNum)} >
        <div className={"arp_sequencenote_inner "}>
          {stepNum+1}
        </div>
      </div>
    )
}
  
  export default SequenceNote
  