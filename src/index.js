const express = require("express");
const exampl_1 = require("./example_2.json");
const app = express();
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const mongoose = require("mongoose");

app.use(express.json());

app.use("/users", userRouter);

app.use("/note", noteRouter);

app.get("/", (req, res) => {
  res.send("Suuuuuuuuuuuuuuuuuuiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
});
app.get("/quotes", (req, res) => {
  res.status(200).send(exampl_1);
});
mongoose
  .connect("mongodb+srv://admin:admin@cluster0.0n6gqc5.mongodb.net/test")
  .then(() => {
    app.listen(5000, () => {
      console.log("server runing");
    });
  })
  .catch((err) => {
    console.log(err);
  });
