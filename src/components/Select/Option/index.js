import style from './index.css';

const Option = ({ option, select, active }) => {
  
    const clickHandler = (option)=>{
        select(option)
    }

  return (
    <div
        onClick={() => clickHandler(option)}  
        className={"arp_select_option "+(active?"arp_select_option--active":'')} >
      {option.label}
    </div>
  )

}

export default Option

// 