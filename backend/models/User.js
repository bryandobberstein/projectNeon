const { getDb } = require('./util/db');

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.interface = 'default';
  }

  async save() {
    const db = getDb;
    try {
      const result = await db
        .collection('user')
        .insertOne(this);
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }
  async find(email) {
    const db = getDb;
    try {
      const user = await db
        .collection('user')
        .findOne({ email: email });
      return user;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  async updateInterface(email, interface) {
    const db = getDb;
    try {
      const user = await db
        .collection('user')
        .findOne({ email: email });
      user.updateOne({
        interface: interface,
      });
      return user;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

module.exports = User;
