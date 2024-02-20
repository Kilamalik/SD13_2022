const mongoose = require("mongoose");

const InstructorSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  ID: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  initialLogin: {
    type: Boolean,
    required: true,
  },
});

module.exports = Instructor = mongoose.model("instructor", InstructorSchema); // Instrctuor is the variable, instrctor is the name of the model, InstructorSchema is the model schema
