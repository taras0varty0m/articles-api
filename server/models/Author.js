const mongoose = require("mongoose");
const Author = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  articles: [
    {
      type: mongoose.ObjectId,
      ref: "Article",
    },
  ],
});
module.exports = mongoose.model("Author", Author);
