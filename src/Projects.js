import React from 'react';

function Projects({ onHeaderMouseDown, onClose }) {
  const projects = [
    { name: 'Portfolio OS', description: 'A web-based OS simulation.', tech: 'React, CSS', icon: '🖥️', link: 'https://github.com/your-username/portfolio-os' },
    { name: 'E-commerce API', description: 'A RESTful API for an online store.', tech: 'Node.js, Express', icon: '🔗', link: 'https://github.com/your-username/ecommerce-api' },
    { name: 'Mobile Task Manager', description: 'A native app for managing tasks.', tech: 'React Native', icon: '📱', link: 'https://github.com/your-username/task-manager-app' },
    { name: 'Data Visualization', description: 'A dashboard for visualizing data.', tech: 'D3.js, React', icon: '📊', link: 'https://github.com/your-username/data-viz-dashboard' },
  ];

  return (
    <div style={{
      background: '#f8fafc',
      borderRadius: 12,
      minWidth: 550,
      minHeight: 350,
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
        <span style={{ fontSize: 18, marginRight: 10 }}>🗂️</span>
        <span style={{ flex: 1 }}>Projects</span>
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
            aria-label="Close projects"
          >
            &times;
          </button>
        )}
      </div>
      <div style={{ flex: 1, padding: '10px', overflowY: 'auto', background: '#fff' }}>
        <table className="projects-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Tech</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => (
              <tr key={i}>
                <td><span className="project-icon">{p.icon}</span>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.tech}</td>
                <td>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link">
                    🐙
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Projects; 