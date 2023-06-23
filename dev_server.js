// server.js

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const WebSocket = require('ws');

const dev = true;
const hostname = 'localhost';
const port = 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const wss = new WebSocket.Server({ noServer: true });

let userConnections = {}; // Map users to their connections

wss.on('connection', (ws, req) => {
  const parsedUrl = parse(req.url, true);
  const { pathname } = parsedUrl;
  // const userID = new URL(req.url, 'http://localhost:3000/').searchParams.get('userID');
  const userID = new URL(
    req.url,
    'https://ccb1-87-97-7-48.ngrok-free.app/'
  ).searchParams.get('userID');
  // userConnections[userID] = ws;

  userConnections[`${userID}-${Date.now()}`] = ws;
  // only add userid if it doesn't

  // ws.on('message', (message) => {});
});

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    if (pathname === '/api/send-message') {
      const { type, message, userID } = parsedUrl.query;

      const userConnection = userConnections[userID];

      // loop userConnections Set
      for (const [key, value] of Object.entries(userConnections)) {
        // if key starts with userID
        if (key.startsWith(userID)) {
          value.send(JSON.stringify({ type, message }));
        }
      }

      if (userConnection && userConnection.readyState === WebSocket.OPEN) {
        // userConnection.send(JSON.stringify({ type, message }));
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({
            success: true,
            message: 'Message sent to WebSocket client.',
          })
        );
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, message: 'User not connected' }));
      }
    } else {
      handle(req, res, parsedUrl);
    }
  });

  // Upgrade the WebSocket connection
  server.on('upgrade', (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req);
    });
  });

  server
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, hostname, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
