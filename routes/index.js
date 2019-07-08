const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

//Index page
router.get("/", (req, res, next) => res.render("welcome"));

// Dashboard
router.get("/dashboard",ensureAuthenticated, (req, res, next) => {
  res.render("dashboard",{
    name: 'Auntor'
  });
});

module.exports = router;
