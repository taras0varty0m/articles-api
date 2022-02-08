const Author = require("../models/Author");
const Article = require("../models/Article");
class AuthorController {
  async getAll(req, res) {
    try {
      const authors = await Author.find();
      res.json(authors);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Can not get authors" });
    }
  }
  async getById(req, res) {
    try {
      const author = await Author.findById(req.params.id);
      res.json(author);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Can not get author" });
    }
  }
  async create(req, res) {
    try {
      const { name, surname } = req.body;
      const author = new Author({
        name,
        surname,
      });
      await author.save();
      return res.json(author);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Can not create author" });
    }
  }
  async deleteById(req, res) {
    try {
      const author = await Author.findByIdAndDelete(req.params.id);

      if (!author) return res.status(404).json({ message: "Author not found" });

      if (author.articles)
        author.articles.forEach(async (element) => {
          await Article.findByIdAndDelete(element);
        });

      return res.json(author);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Can not delete author" });
    }
  }
}

module.exports = new AuthorController();
