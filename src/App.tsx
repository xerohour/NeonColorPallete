import React, { useState, useEffect } from 'react';
import './App.css';

const NEON_COLORS = [
  { name: 'Electric Pink', hex: '#FF00FF', rgb: '255, 0, 255' },
  { name: 'Vivid Magenta', hex: '#FF007F', rgb: '255, 0, 127' },
  { name: 'Nuclear Purple', hex: '#9400D3', rgb: '148, 0, 211' },
  { name: 'Cyber Cyan', hex: '#00FFFF', rgb: '0, 255, 255' },
  { name: 'Ultra Violet', hex: '#4B0082', rgb: '75, 0, 130' },
  { name: 'Acid Green', hex: '#39FF14', rgb: '57, 255, 20' },
  { name: 'Fluo Orange', hex: '#FF4500', rgb: '255, 69, 0' },
  { name: 'Plasma Yellow', hex: '#FFFF00', rgb: '255, 255, 0' },
  { name: 'Atomic Red', hex: '#FF0000', rgb: '255, 0, 0' },
  { name: 'Blacklight Blue', hex: '#0000FF', rgb: '0, 0, 255' },
  { name: 'Neon Coral', hex: '#FF7F50', rgb: '255, 127, 80' },
  { name: 'Electric Lime', hex: '#CCFF00', rgb: '204, 255, 0' },
  { name: 'Cosmic Sky', hex: '#87CEEB', rgb: '135, 206, 235' },
  { name: 'Alien Slime', hex: '#ADFF2F', rgb: '173, 255, 47' },
  { name: 'Hot Tangerine', hex: '#FFA500', rgb: '255, 165, 0' },
];

const EMOJIS = ['👽', '🛸', '⭐', '🚀', '🌌', '🪐', '👾'];

const MatrixRain = () => {
  const [chars, setChars] = useState<{ id: number; char: string; left: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newChar = {
        id: Math.random(),
        char: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        left: Math.random() * 100,
        duration: 5 + Math.random() * 5,
        delay: Math.random() * 2,
      };
      setChars((prev) => [...prev.slice(-50), newChar]);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="matrix-rain">
      {chars.map((c) => (
        <span
          key={c.id}
          className="matrix-char"
          style={{
            left: `${c.left}%`,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
        >
          {c.char}
        </span>
      ))}
    </div>
  );
};

const App = () => {
  const [selectedColor, setSelectedColor] = useState(NEON_COLORS[0]);
  const [sliderPos, setSliderPos] = useState(0);

  const handleSliderChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  return (
    <div className="app-container">
      <div className="neon-grid" />
      <MatrixRain />
      
      <main className="content">
        <header className="header">
          <h1>Neon Wavelength Picker</h1>
          <p style={{ color: 'var(--neon-green)', marginTop: '10px' }}>
            ESOTERIC • VAPORWAVE • BLACKLIGHT • PRINT-READY
          </p>
        </header>

        <section className="preview-area">
          <div className="inkjet-preview">
            <div className="print-head" />
            <div 
              style={{ 
                width: '150px', 
                height: '150px', 
                backgroundColor: selectedColor.hex,
                boxShadow: `0 0 40px ${selectedColor.hex}`,
                border: '4px solid white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                textShadow: '0 0 5px black'
              }}
            >
              INKJET SAMPLE
            </div>
          </div>
          <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ color: selectedColor.hex, fontSize: '2rem', marginBottom: '10px' }}>{selectedColor.name}</h2>
            <p>HEX: {selectedColor.hex}</p>
            <p>RGB: {selectedColor.rgb}</p>
            <p style={{ marginTop: '20px', fontSize: '0.9rem', opacity: 0.8 }}>
              This wavelength is optimized for high-intensity fluorescent inkjet output.
              Ensure your printer is loaded with UV-reactive specialty inks.
            </p>
          </div>
        </section>

        <section className="wavelength-picker">
          <h3 style={{ marginBottom: '10px', color: 'var(--neon-cyan)' }}>WAVELENGTH SPECTRUM</h3>
          <div className="wavelength-slider" onClick={handleSliderChange}>
            <div className="slider-handle" style={{ left: `${sliderPos}%` }} />
          </div>
        </section>

        <section className="palette-grid">
          {NEON_COLORS.map((color) => (
            <div 
              key={color.hex} 
              className="color-swatch"
              onClick={() => setSelectedColor(color)}
              style={{ borderColor: selectedColor.hex === color.hex ? 'white' : 'transparent' }}
            >
              <div className="swatch-box" style={{ backgroundColor: color.hex, boxShadow: `0 0 10px ${color.hex}` }} />
              <div className="swatch-info">
                <div className="swatch-name">{color.name}</div>
                <div>{color.hex}</div>
                <div>{color.rgb}</div>
              </div>
            </div>
          ))}
        </section>

        <footer style={{ textAlign: 'center', padding: '20px', opacity: 0.5, fontSize: '0.8rem' }}>
          © 2026 ESOTERIC PRINT SYSTEMS • MADE WITH 💖 AND UV LIGHT
        </footer>
      </main>
    </div>
  );
};

export default App;
