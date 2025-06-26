import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Projects from './Projects';
import Terminal from './Terminal';
import FileManager from './FileManager';

function App() {
  const [showSearch, setShowSearch] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showFileManager, setShowFileManager] = useState(false);
  const searchRef = useRef(null);
  const projectsRef = useRef(null);
  const terminalRef = useRef(null);
  const fileManagerRef = useRef(null);
  const [terminalPos, setTerminalPos] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [fileManagerPos, setFileManagerPos] = useState({ x: 220, y: 100 });
  const [draggingFileManager, setDraggingFileManager] = useState(false);
  const [dragOffsetFileManager, setDragOffsetFileManager] = useState({ x: 0, y: 0 });

  // Windows 11 wallpaper image (public domain or demo)
  const backgroundUrl = 'https://wallpapers.com/images/featured/1080p-3qmj7oaige168170.jpg';

  const toggleSearch = () => setShowSearch(prev => !prev);
  const toggleProjects = () => setShowProjects(prev => !prev);
  const toggleTerminal = () => setShowTerminal(prev => !prev);

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSearch(false);
    }
    if (projectsRef.current && !projectsRef.current.contains(event.target)) {
      setShowProjects(false);
    }
    if (terminalRef.current && !terminalRef.current.contains(event.target)) {
      setShowTerminal(false);
    }
  };

  const handleEscape = (event) => {
    if (event.key === 'Escape') {
      setShowSearch(false);
      setShowProjects(false);
      setShowTerminal(false);
    }
  };

  const handleTerminalMouseDown = (e) => {
    setDragging(true);
    setDragOffset({
      x: e.clientX - terminalPos.x,
      y: e.clientY - terminalPos.y,
    });
  };

  const handleFileManagerMouseDown = (e) => {
    setDraggingFileManager(true);
    setDragOffsetFileManager({
      x: e.clientX - fileManagerPos.x,
      y: e.clientY - fileManagerPos.y,
    });
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging) {
        setTerminalPos({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };
    const handleMouseUp = () => setDragging(false);
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, dragOffset]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (draggingFileManager) {
        setFileManagerPos({
          x: e.clientX - dragOffsetFileManager.x,
          y: e.clientY - dragOffsetFileManager.y,
        });
      }
    };
    const handleMouseUp = () => setDraggingFileManager(false);
    if (draggingFileManager) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingFileManager, dragOffsetFileManager]);

  return (
    <div
      className="desktop"
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      <div className="desktop-icons">
        <div className="desktop-icon">
          <span className="desktop-icon-emoji">🖥️</span>
          <span className="desktop-icon-label">This PC</span>
        </div>
        <div className="desktop-icon" onClick={() => setShowFileManager(true)}>
          <span className="desktop-icon-emoji">📁</span>
          <span className="desktop-icon-label">Documents</span>
        </div>
        <div className="desktop-icon">
          <span className="desktop-icon-emoji">🖼️</span>
          <span className="desktop-icon-label">Pictures</span>
        </div>
        <div className="desktop-icon">
          <span className="desktop-icon-emoji">🗑️</span>
          <span className="desktop-icon-label">Recycle Bin</span>
        </div>
      </div>

      {showSearch && (
        <div className="search-modal" ref={searchRef}>
          <input type="text" placeholder="Type to search..." className="search-input" />
          <ul className="explorer-results">
            <li><span className="explorer-result-icon">📁</span> Documents</li>
            <li><span className="explorer-result-icon">🖼️</span> Pictures</li>
            <li><span className="explorer-result-icon">🎵</span> Music</li>
            <li><span className="explorer-result-icon">⬇️</span> Downloads</li>
            <li><span className="explorer-result-icon">🗂️</span> Open File Explorer</li>
            <li><span className="explorer-result-icon">⚙️</span> Settings</li>
            <li><span className="explorer-result-icon">🌐</span> Web Search</li>
            <li><span className="explorer-result-icon">📁</span> My Portfolio</li>
          </ul>
        </div>
      )}

      {showProjects && (
        <div className="window projects-modal" ref={projectsRef}>
          <Projects />
        </div>
      )}

      {showTerminal && (
        <div
          className="window terminal-modal"
          ref={terminalRef}
          style={{
            position: 'absolute',
            left: terminalPos.x,
            top: terminalPos.y,
            cursor: dragging ? 'grabbing' : 'default',
            zIndex: 100,
            background: 'transparent',
            boxShadow: 'none',
            border: 'none',
            padding: 0,
          }}
        >
          <Terminal onHeaderMouseDown={handleTerminalMouseDown} onClose={() => setShowTerminal(false)} />
        </div>
      )}

      {showFileManager && (
        <div
          className="window filemanager-modal"
          ref={fileManagerRef}
          style={{
            position: 'absolute',
            left: fileManagerPos.x,
            top: fileManagerPos.y,
            cursor: draggingFileManager ? 'grabbing' : 'default',
            zIndex: 101,
            background: 'transparent',
            boxShadow: 'none',
            border: 'none',
            padding: 0,
          }}
        >
          <FileManager onHeaderMouseDown={handleFileManagerMouseDown} onClose={() => setShowFileManager(false)} />
        </div>
      )}

      <div className="taskbar">
        <div className="taskbar-center">
          <button className="taskbar-icon" onClick={toggleSearch} title="Start Menu">🏠</button>
          <button className="taskbar-icon" onClick={toggleProjects} title="Projects">🗂️</button>
          <button className="taskbar-icon" onClick={() => window.open('https://github.com/vishnus1793', '_blank', 'noopener noreferrer')} title="GitHub">🐙</button>
          <button className="taskbar-icon" onClick={toggleTerminal} title="Terminal">💻</button>
          <button className="taskbar-icon" onClick={() => window.open('https://drive.google.com/file/d/10FLTU5zTjppZ2RNqDdYsJZ6tiHU5euaB/view?usp=sharing', '_blank', 'noopener noreferrer')} title="Resume">📄</button>
          <button className="taskbar-icon" title="Settings">⚙️</button>
        </div>
        <div className="taskbar-right">
          <span className="time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
