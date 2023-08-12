const { Router } = require("express");
const { create, getAll } = require("../controllers/contact.controller");
const router = Router();

router.post("/contact", create);
router.get("/contact", getAll);

module.exports = router;