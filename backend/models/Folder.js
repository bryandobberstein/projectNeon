const { getDb } = require('./util/db');

class Folder {
  constructor(title, position) {
    this.title = title;
    this.position = position;
  }

  static async fetchAll() {
    const result = [];
    const db = getDb();
    const folders = await db.collection('folder').find();
    for await (const folder of folders) {
      result.push(folder);
    }
    return result;
  }
}
