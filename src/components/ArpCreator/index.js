import style from './index.css';
import SequenceNote from '../SequenceNote'

import React, {useEffect, useMemo, useState} from 'react'
import Select from '../Select'

const ArpCreator = ({}) => {

    const [arpType, setArpType] = useState({});
    const [arpLength, setArpLength] = useState(4);
    const [arpPattern, setArpPattern] = useState({});


    const arpTypeOptions = useMemo(()=>{
        return [
            {
                value: [0, 4, 3],
                label: 'major',
            },
            {
                value: [0, 3, 4],
                label: 'minor',
            }
        ]
    },[]);

    const arpPatternOptions = useMemo(()=>{
        return [
            {
                label: 'up',
            },
            {
                label: 'up/down',
            },
            {
                label: 'up & down',
            },
            {
                label: 'down',
            },
            {
                label: 'down/up',
            },
            {
                label: 'down & up',
            },
            {
                label: 'octave up',
            },
            {
                label: 'octave down',
            },
            {
                label: 'octave up down',
            },
            {
                label: 'octave down up',
            },
        ]
        },[]);

    useEffect(() => {
        setArpType(arpTypeOptions[0])
    }, [ setArpType, arpTypeOptions]);
    useEffect(() => {
        setArpPattern(arpPatternOptions[0])
    }, [ setArpPattern, arpPatternOptions]);

    const handleSelectArpType = (value)=>{
        setArpType(value);
    }
    const handleSelectArpPattern = (value)=>{
        setArpPattern(value);
    }

    return (
        <div className="arp_arp-creator" >
            <div className="arp_arp-creator_content">
                <Select value={arpType} select={handleSelectArpType} options={arpTypeOptions} ></Select>
                <Select value={arpPattern} select={handleSelectArpPattern} options={arpPatternOptions} ></Select>
            </div>
        </div>
    )

}

export default ArpCreator

// 