const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const port = 8000;
const app = express();

// Middlewares
app.use(cookieParser());

// MongoDB Connection

const url = `mongodb+srv://Soumya:covbae2j64KUiUNN@userdata.da04qcr.mongodb.net/?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to the database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });

// Routes

app.get("/", (req, res) => {
  res.send("Home");
});

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));
app.use(userRoutes);

// Server Starting

app.listen(port, (err) => {
  if (err) {
    console.log("Some error occured");
  } else {
    console.log(`Server running on port ${port}`);
  }
});
