const express = require("express");
const router = express.Router();
const User = require("../models/User");

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
    });
  } else {
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          errors.push({msg:'Email Already Registered'})
          res.render("register", {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          
        }
      })
      .catch((err) => console.log(err));
  }
});

module.exports = router;
