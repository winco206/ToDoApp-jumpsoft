import "./PopUp.css"
import React from 'react'

const PopUp = ({title, popUPtriger, setPopUPtriger, children}) => {
  return (popUPtriger) ? (
    <div className="popUpBody">
      <div className="popUpInner">
        <h3>{title}</h3>
        <button className="close-btn" onClick={() => setPopUPtriger(false)}>close</button>
        {children}
      </div>        
    </div>
  ) : null;
}

export default PopUp