const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
  email: {
    type: String,
    required: [true, "Please Enter  email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter password"],
    minLength: [1, "Please Enter valid password"],
  },
});

module.exports = mongoose.model("User",userSchema)