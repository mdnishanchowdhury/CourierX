const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    fullname: { type: String, required: true },  // Changed `require` to `required`
    email: { type: String, required: true },    // Changed `require` to `required`
    age: { type: Number },
    country: { type: String },
    address: { type: String },
    phoneNumber: { type: String, required: true },  // Added phoneNumber field
    password: { type: String, required: true },
    status: { type: Number, default: 0 },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UserSchema);
