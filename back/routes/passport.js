const passport = require("passport");
const express = require("express");

const router = express.Router();
// Define routes.

router.get("/fail", function (req, res) {
  res.send({error:"Contraseña incorrecta"});
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/fail" }),
  function (req, res) {
    res.send({ user: req.user });
  }
);

router.get("/logout", function (req, res) {
  req.logout();
  
  console.log('si llego a log outtttt')
});

router.get(
  "/profile",
  require("connect-ensure-login").ensureLoggedIn(),
  function (req, res) {
    res.render("profile", { user: req.user });
  }
);

router.get("/getUser", (req, res) => {
  console.log("asked for user", req.user);
  return res.json(req.user || null);
});

module.exports = router;
