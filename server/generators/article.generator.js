const Article = require("../models/Article");
const Author = require("../models/Author");
const Category = require("../models/Category");
const Tag = require("../models/Tag");
const authorGenerator = require("./author.generator");
const categoryGenerator = require("./category.generator");
const tagGenerator = require("./tag.generator");
class ArticleGenerator {
  count = 0;
  async generateArticle() {
    const name = "name" + this.count.toString();
    const summary = "summary" + this.count.toString();
    const content = "content" + this.count.toString();
    const author_id = await authorGenerator.generateAuthor();
    const category_id = await categoryGenerator.generateCategory();
    const tags = [await tagGenerator.generateTag()];
    const article = new Article({
      name,
      summary,
      content,
      author_id,
      category_id,
      tags,
      date: "2022-02-07T13:35:07.295Z",
    });

    const author = await Author.findById(author_id);
    if (author) {
      author.articles.push(article);
      await author.save();
    }

    const category = await Category.findById(category_id);
    if (category) {
      category.articles.push(article);
      await category.save();
    }

    if (tags)
      tags.forEach(async (element) => {
        const tag = await Tag.findById(element);
        await tag.articles.push(article);
        await tag.save();
      });

    await article.save();
    await article.save();
    this.count++;
    return article;
  }
  async dropArticle() {
    await Article.collection.drop();
    this.count = 0;
  }
}
module.exports = new ArticleGenerator();
