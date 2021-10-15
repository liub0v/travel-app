const mongoose = require("mongoose");
const express = require("express");
const auth = require("./routers/auth");
const users = require("./routers/users");
const config = require("config");
const destinations = require("./routers/destinations");
const formData = require("express-form-data");
const os = require("os");
const app = express();

mongoose
  .connect(config.get("DATABASE_URL"))
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.error(error.message));
const options = {
  uploadDir: os.tmpdir(),
  autoClean: true,
};

// parse data with connect-multiparty.
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream
app.use(formData.stream());
// union the body and the files
app.use(formData.union());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/destinations", destinations);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
