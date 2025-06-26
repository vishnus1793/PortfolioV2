import React, { useState, useRef, useEffect } from 'react';

function Terminal({ onClose, onHeaderMouseDown }) {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new window.WebSocket('ws://localhost:3001');
    ws.current.onmessage = (event) => {
      setLines((prev) => [...prev, event.data]);
    };
    return () => ws.current.close();
  }, []);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, [lines]);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      ws.current.send(input + '\n');
      setInput('');
    }
  };

  return (
    <div style={{
      background: '#23272e',
      color: '#e0e0e0',
      borderRadius: 12,
      minWidth: 600,
      minHeight: 340,
      fontFamily: 'Fira Mono, monospace',
      fontSize: 15,
      boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
      border: '1.5px solid #23272e',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}
    onMouseDown={onHeaderMouseDown}
    >
      <div style={{
        background: 'linear-gradient(90deg, #23272e 80%, #2d313a 100%)',
        padding: '0 16px',
        height: 38,
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #2d313a',
        userSelect: 'none',
        fontWeight: 500,
        fontSize: 15,
        letterSpacing: 0.5,
        cursor: 'grab',
      }}
      >
        <span style={{ fontSize: 18, marginRight: 10 }}>💻</span>
        <span style={{ flex: 1 }}>Terminal</span>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#aaa',
              fontSize: 20,
              cursor: 'pointer',
              borderRadius: 4,
              padding: '0 8px',
              transition: 'background 0.2s',
            }}
            onMouseOver={e => (e.target.style.background = '#2d313a')}
            onMouseOut={e => (e.target.style.background = 'none')}
            aria-label="Close terminal"
          >
            &times;
          </button>
        )}
      </div>
      <div style={{ flex: 1, padding: '18px 18px 8px 18px', overflowY: 'auto' }}>
        {lines.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
          <span style={{ color: '#00ff90', marginRight: 4, fontWeight: 600 }}>&gt;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            style={{
              background: '#23272e',
              border: 'none',
              color: '#e0e0e0',
              outline: 'none',
              fontFamily: 'Fira Mono, monospace',
              fontSize: 15,
              flex: 1,
              padding: '3px 0',
            }}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}

export default Terminal; 