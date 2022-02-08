const mongoose = require("mongoose");
const Article = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author_id: {
    type: mongoose.ObjectId,
    ref: "Author",
    required: true,
  },
  category_id: {
    type: mongoose.ObjectId,
    ref: "Category",
    required: true,
  },
  tags: [
    {
      type: mongoose.ObjectId,
      ref: "Tag",
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Article", Article);
