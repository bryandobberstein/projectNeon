const { getDb } = require('./util/db');

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  save() {}
}

module.exports = User;
