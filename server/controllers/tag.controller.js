const Tag = require("../models/Tag");

class TagController {
  async getAll(req, res) {
    try {
      const tags = await Tag.find();
      res.json(tags);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Can not get tags" });
    }
  }
  async getById(req, res) {
    try {
      const tag = await Tag.findById(req.params.id);
      res.json(tag);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Can not get tag" });
    }
  }
  async create(req, res) {
    try {
      const { name } = req.body;
      if (await Tag.findOne({ name })) {
        return res
          .status(400)
          .json({ message: "Can not create tag, already created" });
      }
      const tag = new Tag({ name });
      await tag.save();
      return res.json(tag);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Can not create tag" });
    }
  }
  async deleteById(req, res) {
    try {
      const tag = await Tag.findByIdAndDelete(req.params.id);

      if (!tag) return res.status(404).json({ message: "Tag not found" });

      return res.json(tag);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Can not delete tag" });
    }
  }
}

module.exports = new TagController();
