const { Router } = require("express");
const { login } = require("../controllers/auth.controller");
const router = Router();

router.post("/auth/login", login);

module.exports = router;