const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function (val) {
        return validator.isEmail(val);
      },
      message: 'Please provide a valid email address',
    },
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: [8, 'Password must be at least 8 characters long'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE
      validator: function (val) {
        return val === this.password;
      },
      message: 'Passwords do not match',
    },
  },
});

userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined; // Remove passwordConfirm field after hashing
  next();
});

const User = model('User', userSchema);
module.exports = User;
