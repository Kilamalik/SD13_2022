const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema({
  sendersEmail: {
    type: String,
  },
  receiversEmail: {
    type: String,
  },
  subject: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  sentDate: {
    type: String,
    required: true,
  },
});

module.exports = Email = mongoose.model("email", EmailSchema);
