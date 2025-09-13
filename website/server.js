// server.js
import { createServer } from "https";
import { parse } from "url";
import next from "next";
import fs from "fs";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// 🔑 mkcert files (use absolute paths if they’re in C:/Users/HP)
const httpsOptions = {
  key: fs.readFileSync("C:/Users/HP/localtest.me+1-key.pem"),
  cert: fs.readFileSync("C:/Users/HP/localtest.me+1.pem"),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("> 🚀 Ready on https://localtest.me:3000");
  });
});
