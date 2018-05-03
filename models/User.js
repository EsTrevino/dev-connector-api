const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  //fields for our schema
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      require: true
    },
    date: {
      type: Date,
      default: Date.now()
    }
});

module.exports = User = mongoose.model('users', UserSchema);
