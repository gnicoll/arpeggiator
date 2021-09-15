import React from 'react';
import Octave from '../Octave'

const Keyboard = React.memo(({onClick, playedNote, highlightNote, onHover, notes}) => {
  const octaves = [1,2,3,4,5,6,7]

  //hightlight note should be empty if notes 
  //const hnote = notes.filter((n)=>n?.note===highlightNote)?.length ? highlightNote:'';

  return (
    
    <div className={"arp_keys arp_keys--playing_"+playedNote+" arp_keys--highlighting_"+highlightNote}>
      <div className="arp_keys_shadow"></div>
        <div className="arp_keys_octaves">
          {octaves.map((element, index) => 
            <Octave onClick={onClick} onHover={onHover} octaveNumber={(element)} key={index} />
          )}
        </div>
    </div>
  )
});

export default Keyboard
