
const createUser = require('../app').createUser;
const createPasswordHashObject = require('../app').createPasswordHashObject;
const expect = require('chai').expect;

describe('user model tests', () => {

  it('can generate a password object from password string', (done) => {
    const passwordObject = createPasswordHashObject("peanut", "a");
    const expectedHashObject = {salt: "a", iterations: 100, hash: "jnB+rZt2ved0J0R47XXaTQJl+UJE2fJljqsZTIMKJ1qdMaDcC5aOCZtpCPYBySyyvmEDpt55XTYBbYW+UFAg6LF7bkDGVPPu2YDch3nmYrB+5iGF+EVYxaqKWFdTUyGV/AGogfaUvjKnROFy1JIhF1G4g1B5a1SgA2dqYQeVeOOktpYC8vV3BVDgNpohjM0bXvCl+fQ2zxY7c8UwQ+/ofnW3ou/LWz9eKYzQTVLCJdgqWO6oSE+KRFlK3JZaE2HrczHVr6lsY/Y+XVMM8E0zkIsG0pebd55uj11DrygebeleYPBBajBcN8atyFhs0c0YU98ATrddcOplFLLwBCI2Qw=="};
    expect(passwordObject).to.not.equal(null);
    expect(passwordObject).to.deep.equal(expectedHashObject);
    done();
  });

  it('can create a user in mongo', (done) => {
    createUser("username", "password").then(user => {
      expect(user.username).to.equal("username");
      expect(user.password).to.be.an("object");
      expect(user.password.hash.length).to.equal(344);
      done();
    });
  });
});
