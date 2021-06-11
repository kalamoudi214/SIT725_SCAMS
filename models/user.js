const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    email: {type: String},
    password: {type: String},
    userName: { type: String },
    role: { type: String},
    department: { type : String}
  }
);

module.exports = mongoose.model('user', schema, 'user');
