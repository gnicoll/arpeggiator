import style from './index.css';

const Key = ({ onClick, note, sharp, noteNumber }) => {
    function clickHandler(num, n){
        onClick(num, n)
    }

    return (
      <div className={"arp_key " +"arp_key_"+noteNumber+" " + (sharp? "arp_key--sharp":"")} >
        <div className={"arp_key_inner "} onClick={() => clickHandler(noteNumber, note)} >
        </div>
      </div>
    )
}
  
  export default Key
  