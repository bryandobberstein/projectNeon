const { getDb } = require('../util/db');

class Folder {
  constructor(title, position, email) {
    this.title = title;
    this.position = position;
    this.email = email;
    this.links = [];
  }

  static async fetchAll(email) {
    const result = [];
    const db = getDb();
    try {
      const folders = await db
        .collection('folder')
        .find({ email: email });
      for await (const folder of folders) {
        result.push(folder);
      }
      return result;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  static async save() {
    const db = getDb;
    try {
      const newFolder = await db
        .collection('folder')
        .insertOne(this);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  static async rename(email, title) {
    const db = getDb;
    try {
      const folder = db
        .collection('folder')
        .updateOne(
          { email: email, title: title },
          { $set: { title: title } }
        );
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  static async delete(email, title) {
    const db = getDb;
    try {
      const result = await db
        .collection('folder')
        .deleteOne(
          { email: email, folder: folder },
          { $pull: { links: link } }
        );
      if (result.deletedCount === 1) {
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  static async addLink(email, title, link) {
    const db = getDb;
    try {
      const folder = await db
        .collection('folder')
        .updateOne(
          { title: title, email: email },
          { $push: { links: link } }
        );
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  static async deleteLink(email, folder, link) {
    const db = getDb;
    try {
      const result = await db
        .collection('folder')
        .deleteOne(
          { email: email, folder: folder },
          { $pull: { links: link } }
        );
      if (result.deletedCount === 1) {
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
