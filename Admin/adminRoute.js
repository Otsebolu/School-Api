const express = require("express");
const router = express.Router();
const adminController = require("./adminController");

router.post("/admin/login",adminController.login);
router.post("/admin/logout",adminController.logOut);

module.exports = router;
