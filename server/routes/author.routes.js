const authorController = require("../controllers/author.controller");

const router = require("express").Router();

router.get("/", authorController.getAll);
router.get("/:id", authorController.getById);
router.post("/", authorController.create);
router.delete("/:id", authorController.deleteById);

module.exports = router;
