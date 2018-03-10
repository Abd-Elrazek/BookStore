import React from 'react';

export default function Popup(props) {
  const hidePopup = props.hidePopup;
  const children = props.children;
  return (
    <div className="popup-wrapper">
      <span className="close-btn" onClick={hidePopup}>
        x
      </span>
      <div className="popup_inner">{children}</div>
    </div>
  );
}
