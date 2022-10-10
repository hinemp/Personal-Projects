const express = require("express");
const router = express.Router();
const Comments = require("../models/").Comments;

router.get("/", async (req, res) => {
  const list = await Comments.findAll();
  return res.json(list);
});

router.get("/replies/:id", async (req, res) => {
  const replies = await Comments.findAll({
    where: { parent_id: req.params.id },
  });
  res.json(replies);
});

router.get("/:id", async (req, res) => {
  const comment = await Comments.findAll({ where: { id: req.params.id } });
  res.json(comment);
});

/**
 * TODO: Update to include input validation
 */
router.post("/", async (req, res) => {
  const comment = req.body;
  await Comments.create(comment);
  res.json(comment);
});

/**
 * SHOULDN'T BE PUBLICLY ACCESSIBLE
 */
router.patch("/:id", async (req, res) => {
  // Sneaky little trick
  // Never actually delete the comment, just change username & text to 'deleted'
  // Makes it much easier to use a recursive implementation
  // If reddit can get away with it...
  const updated = await Comments.update(
    { comment_text: "deleted", user: "deleted" },
    { where: { id: req.params.id } }
  );
  res.json(updated);
});

router.delete("/cleanup", async (req, res) => {
  await Comments.destroy({ where: { user: "deleted" } });
  res.json("Cleanup Completed");
});

module.exports = router;
