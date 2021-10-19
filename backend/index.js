const mongoose = require("mongoose");
const express = require("express");
const auth = require("./routers/auth");
const users = require("./routers/users");

const app = express();

mongoose
  .connect("mongodb+srv://Liubov:fnmozw290@travelapp.xcj4z.mongodb.net/test")
  // .connect("mongodb://localhost/travelApp")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.error(error.message));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", auth);
app.use("/api/users", users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
