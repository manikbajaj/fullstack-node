const express = require("express");
const app = express();
const port = 3001;

app.get("/:category", (req, res) => {
  console.log("Request Route Params", req.params);
  console.log("Request Query Params", req.query);
  console.log("Request Headers", req.headers);
  console.log("Request Method", req.method);
  console.log("Request URL", req.url);
  console.log("Request URL", req.body); // right not will return undefined
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
