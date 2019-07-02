const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


router.get("/login", (req, res) => res.render("login"));

router.get("/register", (req, res) => res.render("register"));

router.post("/register", (req, res) => {
  //console.log(req.body)
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "please fill all the fields" });
  }

  if (password !== password2) {
    errors.push({ msg: "Password do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    User.findOne({ where: { email: email } })
      .then((user) => {
        if (user) {
          errors.push({ msg: "Email Already Registered" });
          res.render("register", {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          bcrypt
            .hash(password, 12)
            .then((password) => {
              User.create({
                name,
                email,
                password
              }).then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/login");
              });
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }
});

module.exports = router;
