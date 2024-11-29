const express = require("express");
const router = express.Router();
const {
  queryRetrievePostsbyUsername,
  queryRetrieveAllPosts,
} = require("../postgres");

router.get("/retrieve-all-posts", async (req, res) => {
  try {
    const postData = await queryRetrieveAllPosts();

    // convert binairy image represenation to base64 string to display on frontend
    const postDataWithBase64ImageStrings = postData.map((post, index) => {
      const base64Image = Buffer.from(post.image).toString("base64");
      post.image = base64Image;
      return post;
    });

    res.status(200).json({ data: postDataWithBase64ImageStrings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/retrieve-by-username/:username", async (req, res) => {
  try {
    // const { username } = req.body;
    const username = req.params.username;
    const postData = await queryRetrievePostsbyUsername(username);

    res.status(200).json({ data: postData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
