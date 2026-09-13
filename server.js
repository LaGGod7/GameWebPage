const http = require("http");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

let defaultPort = parseInt(process.env.PORT || "3000", 10);

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    handle(req, res);
  });

  function startListening(port) {
    server.once("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.warn(`[PORT] Port ${port} is currently in use. Trying port ${port + 1}...`);
        startListening(port + 1);
      } else {
        console.error("Server error:", err);
        process.exit(1);
      }
    });

    server.listen(port, () => {
      console.log(`\n=============================================================`);
      console.log(`> [CYBER NOIR MANGA PORTFOLIO] Ready on http://localhost:${port}`);
      console.log(`=============================================================\n`);
    });
  }

  startListening(defaultPort);
}).catch((err) => {
  console.error("Error starting server:", err);
  process.exit(1);
});
