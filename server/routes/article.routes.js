const articleController = require("../controllers/article.controller");

const router = require("express").Router();

router.get("/", articleController.getAll);
router.post("/", articleController.create);
router.get("/today", articleController.getByToday);
router.get("/:id", articleController.getById);
router.delete("/:id", articleController.deleteById);
router.get("/author/:author_id", articleController.getByAuthorId);
router.get("/category/:category_id", articleController.getByCategoryId);

module.exports = router;
