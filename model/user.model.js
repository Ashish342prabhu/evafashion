const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  UserName: { type: String, required: true },
  Number: { type: Number, required: true },
  Email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Number, default: 0 }
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
