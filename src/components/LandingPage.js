import React from 'react';
import './LandingPage.css'; 
import photoboothImg from '../assets/mikha.png';

const LandingPage = ({ onStart }) => {
  return (
    <div className="landing-page">
      <div className="landing-left">
        <h1 className="landing-title">📸 Putobooth 📸</h1>
        <button className="start-button" onClick={onStart}>
          Start Capturing
        </button>
      </div>
      <div className="landing-image">
        <img src={photoboothImg} alt="Photobooth Illustration" />
      </div>
    </div>
  );
};

export default LandingPage;
