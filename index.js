const express = require("express");
// Requiring the worker file to use it
const { Worker } = require("worker_threads");

const app = express();
const port = process.env.port || 3000;

app.get("/non-blocking", (req, res) => {
  res.status(200).send("This page is non-blocking");
});

app.get("/blocking", async (req, res) => {
  // acessing the worker file
  const worker = new Worker("./worker.js");

  worker.on("message", (data) => {
    res.status(200).send(`Result is ${data}`);
  });

  worker.on("error", (error) => {
    res.status(404).send(`An error occured ${error}`);
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
