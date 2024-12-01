const express = require("express");
const router = express.Router();
const {
  querySignUpUser,
  queryLoginUser,
  queryEditProfile,
} = require("../postgres");

router.post("/sign-up", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    await querySignUpUser(email, username, password);

    res.status(201).json("Sucessfully created account");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await queryLoginUser(username, password);
    console.log(user);
    if (user)
      res.status(201).json({ message: "Logged in sucessfully", user: user });
    else
      res
        .status(201)
        .json({ message: "Login information is incorrect", user: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await queryLoginUser(username, password);
    if (user)
      res.status(201).json({ message: "Logged in sucessfully", user: user });
    else
      res
        .status(201)
        .json({ message: "Login information is incorrect", user: NULL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/edit-profile", async (req, res) => {
  try {
    const { username, biography, newPicture } = req.body;

    // get newImage through file upload
    await queryEditProfile(biography, newPicture);

    res.status(201).json({ message: "Edits to profile saved" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
