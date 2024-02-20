const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
    empNo: {
      type: String,
      
      required: true,
    },
    empName: {
      type: String,
    },
    CordinatorEmail: {
      type: String,
      
      required: true,
    },
    date: {
      type:String,
      required:true,

    },
    starttimeoff: {
      type:String ,
    
    },
    Endtimeoff: {
      type:String,
     
    },
    Message: {
      type:String ,
      required: true,
    },
    NumberofDays: {
      type:Number ,
      required: true,
    },

    status: {
      type: String,
      
    },
  });
  
  module.exports = Leave = mongoose.model('leave', LeaveSchema);