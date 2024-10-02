const express = require("express");
const app = express();
const port = 3001;

// mandatory route params
app.get("/users/:role/", (req, res) => {
  console.log("Request Method", req.params);
  console.log("Request Method", req.query);
  res.send("Hello World");
});

app.get("/tasks/:user?/", (req, res) => {
  console.log("Request Method", req.params);
  console.log("Request Method", req.query);
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
