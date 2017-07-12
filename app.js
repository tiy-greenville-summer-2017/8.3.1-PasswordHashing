
const User = require('./models/user');
const crypto = require('crypto');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const env = process.env.NODE_ENV || "development";
const mongoURL = require('./config.json')[env].mongoURL;

mongoose.connect(mongoURL);

const createUser = (username, password) => {
  return User.create({username: username, password: password});
};

const createPasswordHashObject = (password, salt="") => {
  salt = salt || crypto.randomBytes(Math.ceil(32 * 3 / 4)).toString('base64').slice(0, 8);
  const hash = crypto.pbkdf2Sync(password, salt, 100, 256, 'sha256');
  return hash.toString("base64");
};
// write function that takes password and returns object with details

module.exports = {
  createUser: createUser,
  createPasswordHashObject: createPasswordHashObject
};
