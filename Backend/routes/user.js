const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const upload = multer({ storage: multer.memoryStorage() });

const {
  querySignUpUser,
  queryLoginUser,
  queryEditProfile,
} = require("../postgres");

router.post("/sign-up", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const imagePath = path.join(__dirname, "..", "public", "defaultPFP.jpg");
    console.log(__dirname);

    // Read the file into a buffer
    const buffer = fs.readFileSync(imagePath);
    // Get the MIME type
    const mimetype = "image/jpeg";

    await querySignUpUser(email, username, password, buffer, mimetype);

    res.status(201).json("Sucessfully created account");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = await queryLoginUser(username, password);

    if (user) {
      const base64Image = Buffer.from(user.picture).toString("base64");
      user.picture = base64Image;
      res.status(201).json({ message: "Logged in sucessfully", user: user });
    } else
      res
        .status(201)
        .json({ message: "Login information is incorrect", user: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/edit-profile", upload.single("image"), async (req, res) => {
  try {
    const { buffer, mimetype } = req.file;
    const { username, biography } = req.body;

    let user = await queryEditProfile(username, biography, buffer, mimetype);
    const base64Image = Buffer.from(user.picture).toString("base64");
    user.picture = base64Image;

    res.status(201).json({ message: "Edits to profile saved", user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
