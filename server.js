const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

const AuthRoute = require("./routes/auth_route");

// change connection string
mongoose.connect(
  "mongodb+srv://subomi:subomidatabase@cluster0.pokqfol.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
db.on("connected", () => {
  console.log("Databases connection established.");
});

// default request
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// server port and listening.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});

// api routes.
app.use("/api/auth", AuthRoute);
