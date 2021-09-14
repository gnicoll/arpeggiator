const SequenceNote = ({ onClick, note, sharp, noteNumber }) => {
    function clickHandler(num, n){
        onClick(num, n)
    }

    return (
      <div className={"arp_sequencenote " +"arp_sequencenote_"+noteNumber} onClick={() => clickHandler(noteNumber, note)} >
        <div className={"arp_sequencenote_inner "}>
        </div>
      </div>
    )
}
  
  export default SequenceNote
  