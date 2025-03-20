import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import './PhotoBooth.css';

const PhotoBooth = ({ name, onComplete }) => {
  const webcamRef = useRef(null);
  const [countdown, setCountdown] = useState(3);
  const [capturedImages, setCapturedImages] = useState([]);
  const [photoNumber, setPhotoNumber] = useState(1); // 1-based for display
  const [hasStarted, setHasStarted] = useState(false);
  const [flash, setFlash] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  
  const TOTAL_PHOTOS = 3;

  // This effect handles the countdown and capturing
  useEffect(() => {
    if (!hasStarted || photoNumber > TOTAL_PHOTOS || isCapturing) return;

    let countdownTimer;
    let currentCount = countdown;
    
    const startCountdown = () => {
      countdownTimer = setInterval(() => {
        currentCount -= 1;
        setCountdown(currentCount);
        
        if (currentCount === 0) {
          clearInterval(countdownTimer);
          handleCapture();
        }
      }, 1000);
    };
    
    startCountdown();
    
    return () => {
      clearInterval(countdownTimer);
    };
  }, [hasStarted, photoNumber, isCapturing]);

  // This effect checks if we're done with all photos
  useEffect(() => {
    if (photoNumber > TOTAL_PHOTOS) {
      setTimeout(() => {
        onComplete(capturedImages);
      }, 1000);
    }
  }, [photoNumber, capturedImages, onComplete]);

  const handleCapture = () => {
    setIsCapturing(true);
    
    // Capture the image
    const image = webcamRef.current.getScreenshot();
    setCapturedImages(prev => [...prev, image]);
    
    // Show flash effect
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
    
    // Wait a moment before starting the next photo
    setTimeout(() => {
      // Move to next photo
      setPhotoNumber(prev => prev + 1);
      // Reset countdown
      setCountdown(3);
      // Allow capturing again
      setIsCapturing(false);
    }, 500);
  };

  const handleStart = () => {
    setHasStarted(true);
    setPhotoNumber(1);
    setCapturedImages([]);
    setCountdown(3);
    setIsCapturing(false);
  };

  return (
    <div className="photo-booth">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="webcam-feed"
        videoConstraints={{ facingMode: 'user' }}
      />

      {!hasStarted ? (
        <button className="start-button" onClick={handleStart}>
          Start Photobooth
        </button>
      ) : photoNumber <= TOTAL_PHOTOS ? (
        <div className="photo-status">
          <p className="countdown-text">Next shot in: {countdown}</p>
          <p className="progress-text">Photo {photoNumber} of {TOTAL_PHOTOS}</p>
        </div>
      ) : (
        <p className="processing-text">Processing your photos...</p>
      )}

      {flash && <div className="flash-overlay"></div>}
    </div>
  );
};

export default PhotoBooth;