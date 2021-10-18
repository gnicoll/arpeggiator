import style from './index.css';

const Key = ({ onClick, note, sharp, noteNumber, onHover }) => {
    function clickHandler(num, n){
      if (onClick)
        onClick(num, n)
    }
    function hoverHandler(num, n){
      if (onHover)
        onHover(num, n)
    }

    return (
      <div className={"arp_key " +"arp_key_"+noteNumber+" " + (sharp? "arp_key--sharp":"")} >
        <div 
          className={"arp_key_inner "} 
          onClick={() => clickHandler(noteNumber, note)} 
          onMouseEnter={() => hoverHandler(noteNumber)}
          onMouseLeave={() => hoverHandler(undefined)} 
        >
        </div>
      </div>
    )
}
  
  export default Key
  