const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String,
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  role: { type: String, default: 'user' },
  documents: [
    {
      name: String,
      reference: String,
    },
  ],
  last_connection: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
