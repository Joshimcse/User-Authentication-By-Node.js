const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => res.render("login"));

router.get("/register", (req, res) => res.render("register"));

// Dashboard
// router.get("/dashboard", ensureAuthenticated, (req, res) =>
//   res.render("dashboard", {
//     user: req.user
//   })
// );

module.exports = router;
