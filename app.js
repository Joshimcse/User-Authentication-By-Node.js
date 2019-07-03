const express = require("express");
const app = express();
const indexRoutes = require("./routes/index");
const usersRoutes = require("./routes/users");
const expressLayouts = require("express-ejs-layouts");
const sequelize = require("./config/key");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require('passport')


//passport config
require('./config/passport')(passport)
//View Engine
app.use(expressLayouts);
app.set("view engine", "ejs");

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));

//Express-Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect Flash
app.use(flash());

//Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

//Routes
app.use("/", indexRoutes);
app.use("/users", usersRoutes);

//DB Connection
const PORT = process.env.PORT || 5000;
sequelize
  .sync()
  .then(() => {
    app.listen(
      PORT,
      console.log(`Database connected and server run on port ${PORT}`)
    );
  })
  .catch((err) => console.log(err));
