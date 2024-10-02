const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  console.log("Request Method", req.method);
  res.send("Hello World");
});

app.post("/", (req, res) => {
  console.log("Request Method", req.method);
  res.send("Hello World");
});

app.patch("/", (req, res) => {
  console.log("Request Method", req.method);
  res.send("Hello World");
});

app.put("/", (req, res) => {
  console.log("Request Method", req.method);
  res.send("Hello World");
});

app.delete("/", (req, res) => {
  console.log("Request Method", req.method);
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
