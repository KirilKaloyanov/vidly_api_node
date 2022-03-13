const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();
const { Genre } = require("../models/genre");

router.get("/", async (req, res, next) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", async (req, res, next) => {
  const genre = await Genre.findById(req.params.id);
  res.send(genre);
});

router.post("/", auth, async (req, res) => {
  try {
    if (!req.body.name)
      return res.status(400).send("Bad request. Genre needs a name");
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.send(genre);
  } catch (ex) {
    for (let field in ex.errors) res.status(400).send(ex.errors[field].message);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    if (!req.body.name)
      return res.status(400).send("Bad request. Genre needs a name");
    let genre = await Genre.findById(req.params.id);
    genre.set({ name: req.body.name });
    await genre.save();
    res.send(genre);
  } catch (ex) {
    if (ex.kind) return res.status(400).send("No such Genre");
    for (let field in ex.errors) res.status(400).send(ex.errors[field].message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    res.send(genre);
  } catch (ex) {
    if (ex.kind) return res.status(400).send("No such Genre!!!");
  }
});

module.exports = router;
