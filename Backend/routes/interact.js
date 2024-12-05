const express = require("express");
const router = express.Router();
const {
  queryCommentPost,
  queryLikePost,
  queryOtherUserInformation,
  queryFollowUser,
} = require("../postgres");

router.get("/retrieve-other-user/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const userData = await queryOtherUserInformation(username);

    const base64Image = Buffer.from(userData.picture).toString("base64");
    userData.picture = base64Image;

    res.status(201).json({ message: "User Data Retrieved", user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/follow", async (req, res) => {
  try {
    const { selfUsername, otherUsername } = req.body;

    await queryFollowUser(selfUsername, otherUsername);

    res.status(201).json({ message: "Follow Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/comment", async (req, res) => {
  try {
    const { postID, comment, selfUsername, otherUsername } = req.body;

    await queryCommentPost(postID, comment, selfUsername, otherUsername);

    res.status(201).json({ message: "Comment Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/like", async (req, res) => {
  try {
    const { postID, selfUsername, otherUsername } = req.body;

    await queryLikePost(postID, selfUsername, otherUsername);

    res.status(201).json({ message: "Like Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
