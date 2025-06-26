const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const pty = require('node-pty');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  // Start a shell
  const shell = pty.spawn(process.env.SHELL || 'bash', [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env,
  });

  // Send shell output to client
  shell.on('data', (data) => ws.send(data));

  // Receive input from client and write to shell
  ws.on('message', (msg) => shell.write(msg));

  ws.on('close', () => shell.kill());
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Terminal backend running on http://localhost:${PORT}`);
}); 