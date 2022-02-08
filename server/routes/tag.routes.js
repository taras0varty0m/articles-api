const tagController = require("../controllers/tag.controller");

const router = require("express").Router();

router.get("/", tagController.getAll);
router.get("/:id", tagController.getById);
router.post("/", tagController.create);
router.delete("/:id", tagController.deleteById);

module.exports = router;
