const categoryController = require("../controllers/category.controller");

const router = require("express").Router();

router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getById);
router.post("/", categoryController.create);
router.delete("/:id", categoryController.deleteById);
module.exports = router;
