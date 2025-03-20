import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import NamePrompt from './components/NamePrompt';
import PhotoBooth from './components/PhotoBooth';
import PhotoStrip from './components/PhotoStrip';
import './index.css';

function App() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [images, setImages] = useState([]);

  const handleStart = () => setStep(1);
  const handleNameSubmit = (enteredName) => {
    setName(enteredName);
    setStep(2);
  };
  const handleCaptureComplete = (captured) => {
    setImages(captured);
    setStep(3);
  };

  return (
    <>
      {step === 0 && <LandingPage onStart={handleStart} />}
      {step === 1 && <NamePrompt onSubmitName={handleNameSubmit} />}
      {step === 2 && <PhotoBooth name={name} onComplete={handleCaptureComplete} />}
      {step === 3 && <PhotoStrip images={images} name={name} />}
    </>
  );
}

export default App;