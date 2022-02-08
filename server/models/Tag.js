const mongoose = require("mongoose");
const Tag = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  articles: [
    {
      type: mongoose.ObjectId,
      ref: "Article",
    },
  ],
});
module.exports = mongoose.model("Tag", Tag);
