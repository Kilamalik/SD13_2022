const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimeTableSchema = new mongoose.Schema({
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  module: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  hours :{
    type:Number
  },

  /*   sessionType: {
    type: String,
    required: true,
  }, */
hours : {type : Number , default : 0 },
  empName: {
    type: String,
    required: true,
  },
  empNo: {
    type: String,
    required: true,
  },
  slotID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});
const Timetable = mongoose.model('TimeTable', TimeTableSchema);
module.exports = Timetable; //Timetable is the variable, Timetable is the name of the model used for reference, TimetableSchema is the model schema

//start time, end time, day of the week, module, venue, group, lab/lecture/tutorial, staff requirement

// group => { year, semester, WE/WD, batch no.}, will be made into an object later into development for filter purposes.