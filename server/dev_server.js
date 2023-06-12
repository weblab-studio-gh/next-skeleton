const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = true;
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const WebSocket = require("ws");
const wss = new WebSocket.Server({ noServer: true });

// Function to send a WebSocket message to clients
const sendWebSocketMessage = (message) => {
  wss.clients.forEach((client) => {
    console.log("REQUEST URL FROM CLIENT ----------->", client);
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};

app.prepare().then(() => {
  const server = createServer((req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;

      // process and log request
      console.log("Request received:", req.method, req.url);
      // log the incoming request data
      console.log("Request data:", req.data);
      // log query string parameters
      console.log("Query string parameters:", parsedUrl.query);
      const { type, message } = parsedUrl.query;

      if (pathname === "/api/send-message") {
        // Send a WebSocket message
        sendWebSocketMessage({
          type,
          message,
        });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            success: true,
            message: "Message sent to WebSocket clients.",
          })
        );
      } else {
        handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  });

  // Upgrade the WebSocket connection
  server.on("upgrade", (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (client) => {
      wss.emit("connection", client, req);
    });
  });

  server
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, hostname, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
