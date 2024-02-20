const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
  moduleName: {
    type: String,
    required:true,
    unique:true
  },
  ModuleID: {
    type: String,
    
  },
  specialization: {
    type: String,
    
  },
  year: {
    type: String,
   
  },
  semester: {
    type: String,
    
  },
});

module.exports = Module = mongoose.model('module', ModuleSchema); // Module is the variable, module is the name of the model, ModuleSchema is the model schema
