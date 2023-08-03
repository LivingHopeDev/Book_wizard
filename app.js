const express = require("express");
const Route = require("./Routes/Route");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", Route);

app.listen(process.env.PORT, () => {
  console.log("Server running at port 5000");
});
