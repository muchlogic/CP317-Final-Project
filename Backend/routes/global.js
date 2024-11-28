const express = require("express");
const router = express.Router();
const { queryRetrievePostsbyUsername } = require("../postgres");

router.get("/retrieve-by-username/:username", async (req, res) => {
  try {
    // const { username } = req.body;
    const username = req.params.username;
    const postData = await queryRetrievePostsbyUsername(username);
    console.log(postData);
    res.status(201).json({ data: postData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
