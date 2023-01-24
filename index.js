const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { connection } = require("./config/db");
const { UserModel } = require("./model/userModel");
const { AdminModel } = require("./model/adminModel");
const { mongoose } = require("mongoose");
const { jobRouter } = require("./routes/job.route");

const app = express();
mongoose.set("strictQuery", true);
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const checkUser = await UserModel.find({ email });
  const checkAdmin = await AdminModel.find({ email });
  if (checkUser.length > 0 || checkAdmin.length > 0) {
    res.send({ msg: "Email already exist",status:100 });
  } else {
    try {
      if (email.includes("@masaischool.com")) {
        const new_admin = new AdminModel({ name, email, password });
        await new_admin.save();
        res.send({ msg: "Registration success as admin",status:200 });
      } else {
        const new_user = new UserModel({ name, email, password });
        await new_user.save();
        res.send({ msg: "Registration success as user",status:200 });
      }
    } catch (error) {
      console.log(error);
      res.send({ err: "Registration failed",status:300 });
    }
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email.includes("@masaischool.com")) {
      const checkAdmin = await AdminModel.find({ email, password });
      if (checkAdmin.length > 0) {
        const token = jwt.sign({ id: checkAdmin[0]._id }, process.env.key);
        res.send({ msg: "Login successfull as admin", token: token ,status:200});
      } else {
        res.send({ err: "Enter correct credentials",status:300 });
      }
    } else {
      const checkUser = await UserModel.find({ email, password });
      if (checkUser.length > 0) {
        const token = jwt.sign({ id: checkUser[0]._id }, process.env.key);
        res.send({ msg: "Login Successfull", token: token,status:200 });
      } else {
        res.send({ err: "Enter correct credentials",status:300 });
      }
    }
  } catch (error) {}
});
app.use('/job',jobRouter);
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to database", process.env.port);
  } catch (error) {
    console.log(error);
    console.log("Database is not responding");
  }
});
