const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const userRoute = require("./routes/user");
const parcelRoute = require("./routes/parcel");
const usersRoute = require("./routes/users");
const authRoute = require("./routes/authuser");


dotenv.config();
const app = express();

//MIDDLEWARES
app.use(cors());
app.use(express.json());

//Router

app.use("/api/v1/auth", authRouter); //user 1
app.use("/api/v1/auths", authRoute); //user 2

// app.use("/api/v1/auth", userRoute);
app.use("/api/v1/users", userRoute); //user 1

app.use("/api/v1/user", usersRoute); //user 2
app.use("/api/v1/parcels", parcelRoute);

//Database connection

const DB = process.env.DB;
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection is successful");
  })
  .catch((err) => {
    console.log(err);
  });

//SERVER

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
