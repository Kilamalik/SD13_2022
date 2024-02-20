const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  empNo: {
    type: String,
    unique: true,
    required: true,
  },
  empName: {
    type: String,
    required: true,
  },
  sliitEmail: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  department: {
    type: String,
    required: true,
    default: 'None',
  },
  vacancyStatus: {
    type: String,
    default: 'false',
  },
});

module.exports = Employee = mongoose.model('employee', EmployeeSchema); // Employee is the variable, employee is the name of the model, EmployeeSchema is the model schema

//The first argument in mongoose.model() is the singular name of the collection your model is for
