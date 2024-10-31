import "./PopUp.css"
import React from 'react'

const PopUp = (props) => {
  return (props.popUPtriger) ? (
    <div className="popUpBody">
      <div className="popUpInner">
        <h3>{props.title}</h3>
        <button className="close-btn" onClick={() => props.setPopUPtriger(false)}>close</button>
        {props.children}
      </div>        
    </div>
  ) : null;
}

export default PopUp