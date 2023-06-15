function sendMessageToAllClients(message) {
  const wws = new WebSocket.Server({ port: 8080 });
  wws.on("connection", (ws) => {
    ws.on("message", (message) => {
      console.log("received: %s", message);
    });
    ws.send(message);

    ws.on("close", () => {
      console.log("ws is closed server");
    });
  });
  wws.close();
}

export { sendMessageToAllClients };
