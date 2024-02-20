const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema({
  noticeNo: {
    type: Number,
    unique: true,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  content: {
    type: String,

    required: true,
  },
  author: {
    type: String,

    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
  },
});

module.exports = Notice = mongoose.model("notice", NoticeSchema); // Employee is the variable, employee is the name of the model, EmployeeSchema is the model schema
