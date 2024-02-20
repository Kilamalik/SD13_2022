const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  vName: {
    type: String,
    required: true,
    unique: true,
  },
  vID: {
    type: String,
    //required: true,
    //unique: true
  },
  type: {
    type: String,
    //required: true,
  },
  size: {
    type: String,
    //required: true
  },
  floor: {
    type: String,
    //required: true
  },
  faculty: {
    type: String,
    //required: true
  },
});

module.exports = Venue = mongoose.model('venue', venueSchema); // Module is the variable, module is the name of the model, ModuleSchema is the model schema
