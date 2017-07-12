
const createUser = require('../app').createUser;
const createPasswordHashObject = require('../app').createPasswordHashObject;
const expect = require('chai').expect;

describe('user model tests', () => {

  it('can generate a password object from password string', (done) => {
    const passwordObject = createPasswordHashObject("peanut");
    expect(passwordObject).to.not.equal(null);
    expect(passwordObject).to.equal("");
    done();
  });

  it('can create a user in mongo', (done) => {
    createUser("username", "password").then(user => {
      expect(user.username).to.equal("username");
      expect(user.password).to.be.an("object");
      done();
    });
  });
});
