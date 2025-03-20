import React, { useState } from 'react';
import './NamePrompt.css';
import photoboothLogo from '../assets/putobooth-logo.png';

const NamePrompt = ({ onSubmitName }) => {
  const [name, setName] = useState('');

  return (
    <div className="name-prompt">
      <img src={photoboothLogo} alt="Photobooth Logo" className="logo" />
      <h2 className="name-title">And you are?</h2>
      <input 
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="name-input"
        placeholder="Your Name"
      />
      <button 
        onClick={() => onSubmitName(name)} 
        className="name-button"
      >
        Start Capturing
      </button>
    </div>
  );
};

export default NamePrompt;
