const mongoose = require("mongoose");
const express = require("express");
const auth = require("./routers/auth");
const users = require("./routers/users");
const config = require("config");

const app = express();

mongoose
  .connect(config.get("DATABASE_URL"))
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.error(error.message));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", auth);
app.use("/api/users", users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
