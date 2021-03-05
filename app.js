const express = require("express");
const app = express();
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");

mongoose
  .connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("db conected");
  });

app.use(express.json());

app.use("/api", userRoutes);

app.listen(4000, () => {
  console.log("listening at 4000");
});
