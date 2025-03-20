import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import html2canvas from 'html2canvas';
import './PhotoStrip.css';

const PhotoStrip = ({ images, name }) => {
  const [bgColor, setBgColor] = useState('#ffffff');
  const [filter, setFilter] = useState('none');
  const photoStripRef = useRef(null);

  const handleDownload = () => {
    html2canvas(photoStripRef.current).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'photo-strip.png';
      link.click();
    });
  };

  return (
    <div className="photo-strip-wrapper">
      <h1 className="photo-strip-title">{name}'s Photo Strip</h1>
      <div className="controls">
        <label>
          Background Color:
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </label>
        <label>
          Filter:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="none">None</option>
            <option value="grayscale(100%)">Grayscale</option>
            <option value="sepia(100%)">Sepia</option>
            <option value="blur(5px)">Blur</option>
          </select>
        </label>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="photo-strip-container"
        style={{ backgroundColor: bgColor }}
        ref={photoStripRef}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Shot ${idx + 1}`}
            className="photo-strip-image"
            style={{ filter: filter }}
          />
        ))}
        <p className="photo-strip-name">{name}</p>
      </motion.div>
      <button className="download-button" onClick={handleDownload}>
        Download Photo Strip
      </button>
    </div>
  );
};

export default PhotoStrip;
