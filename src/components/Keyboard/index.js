import React from 'react';
import Octave from '../Octave'
import PropTypes from 'prop-types';

const Keyboard = ({onClick, playedNote, highlightNote, onHover, notes}) => {
  const octaves = [1,2,3,4,5,6,7]
  console.log("render keyboard: "+ playedNote+" " + highlightNote+" "+ notes)
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
}

Keyboard.defaultProps = {
  onClick: undefined,
  playedNote: null, 
  highlightNote: null, 
  onHover: undefined, 
  notes: [],
};

Keyboard.propTypes = {
  onClick: PropTypes.func,
  playedNote: PropTypes.object, 
  highlightNote: PropTypes.object, 
  onHover: PropTypes.func, 
  notes: PropTypes.array,
};

export default React.memo(Keyboard);
