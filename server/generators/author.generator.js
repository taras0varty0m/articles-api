const Author = require("../models/Author");

class AuthorGenerator {
  count = 0;
  async generateAuthor() {
    const name = this.count.toString();
    const surname = this.count.toString();
    const author = new Author({
      name,
      surname,
    });
    await author.save();
    this.count++;
    return author;
  }
  async dropAuthor() {
    await Author.collection.drop();
    this.count = 0;
  }
}
module.exports = new AuthorGenerator();
