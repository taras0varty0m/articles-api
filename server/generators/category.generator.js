const Category = require("../models/Category");

class CategoryGenerator {
  count = 0;
  async generateCategory() {
    const name = this.count.toString();
    const category = new Category({
      name,
    });
    await category.save();
    this.count++;
    return category;
  }
  async dropCategory() {
    await Category.collection.drop();
    this.count = 0;
  }
}
module.exports = new CategoryGenerator();
