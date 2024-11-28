const express = require("express");
const router = express.Router();
const {
  queryUploadPost,
  queryUpdatePost,
  queryDeletePost,
} = require("../postgres");

router.post("/upload", async (req, res) => {
  try {
    const { postTitle, description, nutritionFacts, image, username } =
      req.body;

    await queryUploadPost(
      postTitle,
      description,
      nutritionFacts,
      image,
      username
    );

    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/update", async (req, res) => {
  try {
    const { postTitle, description, nutritionFacts, image, username, postID } =
      req.body;

    await queryUpdatePost(
      postTitle,
      description,
      nutritionFacts,
      image,
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
