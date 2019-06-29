const express = require("express");
const app = express();
const indexRoutes = require("./routes/index");
const usersRoutes = require("./routes/users");
const expressLayouts = require("express-ejs-layouts");
const sequelize = require("./config/key");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);
app.set("view engine", "ejs");

app.use("/", indexRoutes);

app.use("/users", usersRoutes);

const PORT = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, console.log(`Database connected and server run on port ${PORT}`));
  })
  .catch((err) => console.log(err));
