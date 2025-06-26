import React from 'react';

function Projects() {
  return (
    <div style={{ textAlign: 'left', minWidth: 250 }}>
      <h2 style={{ marginTop: 0, fontSize: '1.2rem' }}>My Projects</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ marginBottom: 12 }}><span role="img" aria-label="web">🌐</span> Portfolio Website</li>
        <li style={{ marginBottom: 12 }}><span role="img" aria-label="app">📱</span> Mobile App</li>
        <li style={{ marginBottom: 12 }}><span role="img" aria-label="api">🔗</span> API Service</li>
        <li style={{ marginBottom: 12 }}><span role="img" aria-label="game">🎮</span> Game Project</li>
      </ul>
    </div>
  );
}

export default Projects; 