var express = require("express");
var path = require("path");
var app = express();
/*var io = require("socket.io")(http);*/
const bodyParser = require("body-parser");
const router = require("express").Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../front/public")));

const recoie = require("./nearby");
router.get("/inscription", (req, res, next) => {
  res.render("users/user-form", {
    errors: null,
    isAuthenticated: req.isAuthenticated(),
    currentUser: req.user,
  });
});
const createUser = async (user) => {
  try {
    const hashPassword = await User.hashPassword(user.password);
    const newUser = new User({
      username: user.username,
      local: {
        email: user.email,
        password: hashPassword,
      },
    });
    return newUser.save();
  } catch (e) {
    throw e;
  }
};
router.post("/inscription", async (req, res, next) => {
  const body = req.body;
  try {
    const user = await createUser(body);
    res.redirect("/");
  } catch (e) {
    res.send({
      errors: [e.message],
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  }
});

router.post("/connexion", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      next(err);
    } else if (!user) {
      res.render("connexion", {
        errors: [info.message],
        isAuthenticated: req.isAuthenticated(),
        currentUser: req.user,
      });
    } else {
      req.login(user, (err) => {
        if (err) {
          next(err);
        } else {
          res.redirect("/");
        }
      });
    }
  })(req, res, next);
});
router.get("/deconnexion", (req, res, next) => {
  req.logout();
  res.redirect("/");
});
app.use("/", recoie);

module.exports = app;
