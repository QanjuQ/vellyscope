const express = require("express");
const fs = require("fs");
const proxy = require('http-proxy-middleware').createProxyMiddleware;
const morgan = require("morgan");

const YOUTUBE_BASE_URL = `https://youtube.googleapis.com/youtube/v3`;

const app = express();
const port = process.env.PORT || 8080;
const HTML_FILE = "./dist/index.html";

app.use(express.static("./dist"));

app.get("/", (req, res) => {
  res.send(fs.readFileSync(HTML_FILE, "utf-8"));
});

app.use(morgan("combined"));

const options = {
  target: YOUTUBE_BASE_URL,
  changeOrigin: true,
  logLevel: "debug",
  pathRewrite: (path, req) => path.replace('/api', '/'),
};

app.get("/api/*", proxy(options));

app.listen(port, () => {
  console.log("Magix world!! here " + port);
});
