
const User = require('./models/user');
const crypto = require('crypto');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const env = process.env.NODE_ENV || "development";
const mongoURL = require('./config.json')[env].mongoURL;

mongoose.connect(mongoURL);

const createUser = (username, password) => {
  return User.create({username: username, password: createPasswordHashObject(password)});
};

const createPasswordHashObject = (password, salt="") => {
  salt = salt || crypto.randomBytes(Math.ceil(32 * 3 / 4)).toString('base64').slice(0, 8);
  const hash = crypto.pbkdf2Sync(password, salt, 100, 256, 'sha256');
  const hashString = hash.toString("base64");
  return {salt: salt, iterations: 100, hash: hashString};
};

const login = (username, password) => {
  return User.findOne({username: username}).then(user => {
    if (!user) {
      return false;
    }
    const pwObject = user.password;
    const newPWObject = createPasswordHashObject(password, pwObject.salt);
    return pwObject.hash === newPWObject.hash;
  });
};

module.exports = {
  createUser: createUser,
  login: login,
  createPasswordHashObject: createPasswordHashObject
};
