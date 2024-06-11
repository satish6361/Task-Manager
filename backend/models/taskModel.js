const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  taskid: {
    type: String,
    required: true,
    minLength: 1,
  },
  deadline: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
  },
  userEmail:{
    type:String,
    required:true,
  }
});

module.exports = mongoose.model("Task", taskSchema);
