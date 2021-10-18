import style from './index.css';
import SequenceNote from '../SequenceNote'

import React, {useEffect, useMemo, useState} from 'react'
import Select from '../Select'

const Header = ({inputs}) => {

    const [midiInput, setMidiInput] = useState({label: 'no input',value: 'no input'});

    const inputOptions = [] //constructInputsOptions();

    function constructInputsOptions(){
        if (!inputs || inputs?.length < 1) return [];

        const mappedInputs =  inputs.map(i => ({
            value: i.name,
            label: i.name,
        }))
        mappedInputs.unshift(midiInput);
        setMidiInput(mappedInputs[0]);
        return mappedInputs;
    }

    
    const handleSelectMidiInput = (value)=>{
        setMidiInput(value);
    }

    return (
        <div className="arp_header" >
            <div className="arp_header_menu">
                <Select value={midiInput} select={handleSelectMidiInput} options={inputOptions} ></Select>
            </div>
        </div>
    )

}

export default Header

