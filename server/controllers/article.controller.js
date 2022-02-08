const dayjs = require("dayjs");
const Article = require("../models/Article");
const Category = require("../models/Category");
const Tag = require("../models/Tag");
const Author = require("../models/Author");
const removeItemFromArray = require("../helpers/removeItemFromArray");

class ArticleController {
  async getAll(req, res) {
    try {
      const articles = await Article.find();
      res.json(articles);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Can not get articles" });
    }
  }
  async create(req, res) {
    try {
      const { name, summary, content, author_id, category_id, tags, date } =
        req.body;

      if (await Article.findOne({ name })) {
        return res.status(400).json({
          message: "Can not create article, already created with this name",
        });
      }
      const article = new Article({
        name,
        summary,
        content,
        author_id,
        category_id,
        tags,
        date,
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
      return res.json(article);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Can not create article" });
    }
  }
  async getById(req, res) {
    try {
      const article = await Article.findById(req.params.id);
      res.json(article);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Can not get article" });
    }
  }
  async getByAuthorId(req, res) {
    try {
      const articles = await Article.find({
        author_id: req.params.author_id,
      });
      res.json(articles);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Can not get articles" });
    }
  }
  async getByCategoryId(req, res) {
    try {
      const articles = await Article.find({
        category_id: req.params.category_id,
      });
      res.json(articles);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Can not get articles" });
    }
  }
  async getByToday(req, res) {
    try {
      const today = dayjs().startOf("day");

      const articles = await Article.find({
        date: {
          $gte: today.toDate(),
          $lte: dayjs(today).endOf("day").toDate(),
        },
      });
      res.json(articles);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Can not get articles" });
    }
  }

  async deleteById(req, res) {
    try {
      const article = await Article.findByIdAndDelete(req.params.id);

      if (!article)
        return res.status(404).json({ message: "Article not found" });

      const { author_id, category_id, tags } = article;

      const author = await Author.findById(author_id);
      removeItemFromArray(author.articles, article);
      await author.save();

      const category = await Category.findById(category_id);
      removeItemFromArray(category.articles, article);
      await category.save();

      if (tags)
        tags.forEach(async (element) => {
          const tag = await Tag.findById(element);
          removeItemFromArray(tag.articles, article);
          await tag.save();
        });

      return res.json(article);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Can not delete article" });
    }
  }
}

module.exports = new ArticleController();
