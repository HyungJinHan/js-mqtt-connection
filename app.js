const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

const KEY = fs.readFileSync("key/private.pem.key");
const CERT = fs.readFileSync("key/certification.crt");
const CA = fs.readFileSync("key/root_ca.pem");

// Serve Static Files
app.use(express.static("public"));
app.use("/assets", express.static("public"));

// template view engine
app.set("view engine", "ejs");

// Set the json request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
const subscriberRouter = require("./routes/subscriber");

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use("/", subscriberRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
