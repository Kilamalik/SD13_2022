const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  dayOfTheWeek: {
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
  group: {
    type: String,
  },
  /* sessionType: {
    type: String,
    required: true,
  }, */
  staffRequirement: {
    type: Number,
    default: 2,
  },
  assigned: {
    type: Boolean,
    default: false,
  },
});
const Slot = mongoose.model('slot', SlotSchema);
module.exports = Slot; // Slot is the variable, slot is the name of the model used for reference, SlotSchema is the model schema

//start time, end time, day of the week, module, venue, group, lab/lecture/tutorial, staff requirement

// group => { year, semester, WE/WD, batch no.}, will be made into an object later into development for filter purposes.
