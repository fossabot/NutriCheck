const express = require("express");
const router = express.Router();
const db = require("../db/MongoUtils");

// Register a new user
router.post("/new", (req, res) => {
  usuario = req.body.user;
  db.insertOne(usuario, "users", (user) => {
    res.send(user);
  });
});

// Get user
router.post("/profile", (req, res) => {
  db.findOne(req.body, "users", (user) => res.send(user));
});

router.post("/update", (req, res) => {
  db.updateOne((user) => res.send(user), "users", req.body.filter, {
    $set: req.body.query,
  });
});
// Get users
router.post("/", (req, res) => {
  db.findMany(req.body.user, "users", (user) => res.send(user));
});

// Update user
router.put("/:username", function (req, res) {
  let object = req.body.object;
  let name = req.body.name;
  db.findOne({ username: req.params.username }, "users", (user) => {
    let list = {};
    list[name] = object;
    let update = { $set: list };

    db.updateOne(
      (user) => {
        res.send(user);
      },
      "users",
      { username: req.params.username },
      update
    );
  });
});

// Get patients
router.get("/:username/patients", function (req, res) {
  db.findMany({ nutricionistaId: req.params.username }, "users", (users) =>
    res.send(users)
  );
});

module.exports = router;
