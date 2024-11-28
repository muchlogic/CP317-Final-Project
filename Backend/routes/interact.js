const express = require("express");
const router = express.Router();
const {} = require("../postgres");

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

module.exports = router;
