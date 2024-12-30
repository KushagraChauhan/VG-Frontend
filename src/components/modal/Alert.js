import React from 'react';
import './Alert.css'; 

const Alert = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div className="alert-modal-overlay" onClick={onClose}>
      <div className="alert-modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{message}</h3>
        <button className='alert-close-btn' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Alert;
