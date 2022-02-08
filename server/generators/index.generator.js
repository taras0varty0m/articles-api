const articleGenerator = require("./article.generator");
const config = require("config");

class IndexGenerator {
  async generateArticle(count) {
    for (let i = 0; i < count; i++) {
      await articleGenerator.generateArticle();
    }
  }
  dropDatabase() {
    const mongoose = require("mongoose");
    mongoose.connect(config.get("dbUrl"), () => {
      mongoose.connection.db.dropDatabase();
    });
  }
}

module.exports = new IndexGenerator();
