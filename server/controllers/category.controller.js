const Article = require("../models/Article");
const Category = require("../models/Category");

class CategoryController {
  async getAll(req, res) {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Can not get categories" });
    }
  }
  async getById(req, res) {
    try {
      const category = await Category.findById(req.params.id);
      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Can not get category" });
    }
  }
  async create(req, res) {
    try {
      const { name } = req.body;

      if (await Category.findOne({ name })) {
        return res
          .status(400)
          .json({ message: "Can not create category, already created" });
      }
      const category = new Category({ name });
      await category.save();
      return res.json(category);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Can not create category" });
    }
  }
  async deleteById(req, res) {
    try {
      const category = await Category.findById(req.params.id);

      if (!category)
        return res.status(404).json({ message: "Category not found" });

      if (category.articles)
        category.articles.forEach(async (element) => {
          await Article.findByIdAndDelete(element);
        });
      await Category.findByIdAndDelete(req.params.id);

      return res.json(category);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Can not delete category" });
    }
  }
}

module.exports = new CategoryController();
