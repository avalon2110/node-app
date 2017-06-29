const mongoose = require('mongoose');

let tourSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  company:{
    type: String,
    required: true
  },
  body:{
    type: String,
    required: true
  }
});

let Tour = module.exports = mongoose.model('Tour', tourSchema);
