const express = require("express");
const router = express.Router();
const {
  queryRetrievePostsbyUsername,
  queryRetrieveAllPosts,
  queryRetrievePostbyID,
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

router.get("/retrieve-post-by-id/:postID", async (req, res) => {
  try {
    const postID = req.params.postID;

    let postData = await queryRetrievePostbyID(postID);
    const base64Image = Buffer.from(postData.image).toString("base64");
    postData.image = base64Image;

    res.status(200).json({ data: postData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/retrieve-posts-by-username/:username", async (req, res) => {
  try {
    const username = req.params.username;

    const postData = await queryRetrievePostsbyUsername(username);
    let postDataWithBase64ImageStrings;
    if (postData.length > 0) {
      postDataWithBase64ImageStrings = postData.map((post, index) => {
        const base64Image = Buffer.from(post.image).toString("base64");
        post.image = base64Image;
        return post;
      });
    }

    res.status(200).json({ data: postDataWithBase64ImageStrings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
