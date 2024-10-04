const express = require("express");

const app = express();
const port = 3001;

// mandatory route params
app.get("/some.text", (req, res) => {
  console.log("Request Method", req.url);
  res.send("Hello World");
});

// Here the character s becomes optional
app.get("/posts?", (req, res) => {
  console.log("Request Method", req.url);
  res.send("Hello World");
});

app.get("/tag*", (req, res) => {
  console.log("Request Method", req.url);
  res.send("Hello World");
});

//  These symbols can be used anywhere in url path in between characters or as standalone paths
app.get("/error/*", (req, res) => {
  console.log("Request Method", req.url);
  res.send("Hello World");
});

//  can use regular expressions also
app.get(/.*fly$/, (req, res) => {
  console.log("Request Method", req.url);
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
