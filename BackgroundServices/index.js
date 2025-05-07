const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cron = require("node-cron");
const mongoose = require("mongoose");
const { sendWelcomeEmail } = require("./EmailService/WelcomeEmail");
const { SendParcelPendingEmail } = require("./EmailService/PendingParcel");
const { SendParcelDeliveredEmail } = require("./EmailService/DeliveredParcel");
dotenv.config();

//DB connection
const DB = process.env.DB;
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection is successful");
  })
  .catch((e) => {
    console.log(e);
  });
// Task scheduler

const run = () => {
  cron.schedule("* * * * * *", () => {
    sendWelcomeEmail()
    SendParcelPendingEmail()
    SendParcelDeliveredEmail()
  });
};

run();

//server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`BackgroundServices is running on port ${PORT}`);
});
