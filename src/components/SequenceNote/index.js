import React from 'react';
import style from './index.css';

const SequenceNote = ({ onClick, onHover, note, stepNum, noteNumber }) => {
  function clickHandler(num, n){
      onClick(num, n)
  }

  function hoverHandler(num, n){
    onHover(num, n)
  }

    //console.log("rendering SequenceNote"+(stepNum+1))

    return (
      <div 
        className={"arp_sequencenote " +"arp_sequencenote_"+noteNumber +" arp_sequencenote_step"+stepNum} 
        onClick={() => clickHandler(stepNum)} 
        onMouseEnter={() => hoverHandler(noteNumber)}
        onMouseLeave={() => hoverHandler(undefined)} 
      >
        <div className={"arp_sequencenote_inner "}>
          {stepNum+1}
        </div>
      </div>
    )
}
  
  export default SequenceNote;
  