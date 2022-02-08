const Tag = require("../models/Tag");

class TagGenerator {
  count = 0;
  async generateTag() {
    const name = this.count.toString();
    const tag = new Tag({
      name,
    });
    await tag.save();
    this.count++;
    return tag;
  }
  async dropTag() {
    await Tag.collection.drop();
    this.count = 0;
  }
}
module.exports = new TagGenerator();
