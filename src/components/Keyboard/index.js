import React from 'react';
import Octave from '../Octave'

const Keyboard = React.memo(({onClick}) => {
  const octaves = [2,3,4,5,6,7,8]

  return (
    <div className="arp_keys_octaves" >
      {octaves.map((element, index) => 
        <Octave onClick={onClick} octaveNumber={(element)} key={index} />
      )}
    </div>
  )
});

export default Keyboard
