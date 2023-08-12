const { Router } = require("express");
const { create, getAll, remove, edit } = require("../controllers/feedback.controller");
const router = Router();

router.post("/feedback", create);
router.get("/feedback", getAll);
router.put("/feedback/:id", edit);
router.delete("/feedback/:id", remove);

module.exports = router;