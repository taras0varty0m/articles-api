const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");

const articleRouter = require("./routes/article.routes");
const categoryRouter = require("./routes/category.routes");
const tagRouter = require("./routes/tag.routes");
const authorRouter = require("./routes/author.routes");
const indexGenerator = require("./generators/index.generator");

const app = express();
const PORT = config.get("serverPort") || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/article", articleRouter);
app.use("/api/category", categoryRouter);
app.use("/api/tag", tagRouter);
app.use("/api/author", authorRouter);

const start = async () => {
  try {
    await mongoose.connect(config.get("dbUrl"));
    await indexGenerator.generateArticle(100);
    app.listen(PORT, () =>
      console.log(`> Server is up and running on port : ${PORT}`)
    );
  } catch (error) {
    indexGenerator.dropDatabase();
    console.error(error);
  }
};

start();
