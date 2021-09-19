const mongoose = require("mongoose");
const express = require("express");
const auth = require("./routers/auth");
const users = require("./routers/users");

const app = express();

mongoose
  .connect("mongodb://localhost/travelApp")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.error(error.message));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/travelapp/api/auth", auth);
app.use("/travelapp/api/users", users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...s`));
