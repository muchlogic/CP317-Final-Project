const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  queryUploadPost,
  queryUpdatePost,
  queryDeletePost,
} = require("../postgres");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { buffer, mimetype } = req.file;
    const { postTitle, description, nutritionFacts, username } = req.body;

    const post = await queryUploadPost(
      postTitle,
      description,
      nutritionFacts,
      buffer,
      mimetype,
      username
    );

    res
      .status(201)
      .json({ message: "Post created successfully", postID: post.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/update", upload.single("image"), async (req, res) => {
  try {
    const { buffer, mimetype } = req.file;
    const { postTitle, description, nutritionFacts, username, postID } =
      req.body;
    await queryUpdatePost(
      postTitle,
      description,
      nutritionFacts,
      buffer,
      mimetype,
      username,
      postID
    );

    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const { username, postID } = req.body;

    await queryDeletePost(username, postID);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
