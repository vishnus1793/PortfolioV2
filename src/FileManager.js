import React from 'react';

function FileManager({ onHeaderMouseDown, onClose }) {
  return (
    <div style={{
      background: '#f8fafc',
      borderRadius: 12,
      minWidth: 420,
      minHeight: 260,
      fontFamily: 'Segoe UI, sans-serif',
      fontSize: 15,
      boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
      border: '1.5px solid #e5e5e5',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div
        style={{
          background: 'linear-gradient(90deg, #e5e5e5 80%, #f3f3f3 100%)',
          padding: '0 16px',
          height: 38,
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #e5e5e5',
          userSelect: 'none',
          fontWeight: 500,
          fontSize: 15,
          letterSpacing: 0.5,
          cursor: 'grab',
        }}
        onMouseDown={onHeaderMouseDown}
      >
        <span style={{ fontSize: 18, marginRight: 10 }}>📁</span>
        <span style={{ flex: 1 }}>Certifications</span>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#888',
              fontSize: 20,
              cursor: 'pointer',
              borderRadius: 4,
              padding: '0 8px',
              transition: 'background 0.2s',
            }}
            onMouseOver={e => (e.target.style.background = '#e5e5e5')}
            onMouseOut={e => (e.target.style.background = 'none')}
            aria-label="Close file manager"
          >
            &times;
          </button>
        )}
      </div>
      <div style={{ flex: 1, padding: '18px 18px 8px 18px', overflowY: 'auto', background: '#fff' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: 12 }}><span role="img" aria-label="cert">📜</span> AWS Certified Solutions Architect</li>
          <li style={{ marginBottom: 12 }}><span role="img" aria-label="cert">📜</span> Google Cloud Professional Data Engineer</li>
          <li style={{ marginBottom: 12 }}><span role="img" aria-label="cert">📜</span> Microsoft Certified: Azure Developer Associate</li>
          <li style={{ marginBottom: 12 }}><span role="img" aria-label="cert">📜</span> Certified Kubernetes Administrator</li>
        </ul>
      </div>
    </div>
  );
}

export default FileManager; 