import { useDebugValue } from 'react';
import style from './index.css';
import Option from './Option'
import { useState } from 'react';

const Select = ({ options, select, value }) => {
    const [open, setOpen] = useState(false);

    const optionClickHandler = (option)=>{
        select(option)
        setOpen(false)
    }

    const clickHandler = ()=>{
        setOpen(!open)
    }

    return (
        <div className="arp_select" >
            <div  className="arp_select_value" 
                onClick={() => clickHandler()}>
                {value?.label} {open}
            </div>
            <div className={"arp_select_options "+(open?"arp_select_options--active":'')}>
        {options.map((option, index) => 
            <Option 
                active = {option === value}
                key={index} 
                option={option}
                select={optionClickHandler}
            />
        )}
            </div>
        </div>
    )

}

export default Select

// 