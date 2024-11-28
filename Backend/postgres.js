require("dotenv").config();
const { Client } = require("pg"); // postgres

const client = new Client({
  user: `${process.env.POSTGRES_USERNAME}`,
  password: `${process.env.POSTGRES_PASSWORD}`,
  host: "localhost",
  port: 5432,
  database: "cp317",
});

client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database", err);
  });

// User Management Software Interfaces
const querySignUpUser = async (email, username, password) => {
  try {
    const query =
      "INSERT INTO users(email, username, password) VALUES ($1,$2,$3)";
    const values = [email, username, password];
    const result = await client.query(query, values);
  } catch (err) {
    console.error("Error executing query", err);
  }
};

const queryLoginUser = async (username, password) => {
  try {
    const query = "SELECT * FROM users WHERE username = $1 and password = $2";
    const values = [username, password];
    const result = await client.query(query, values);
    const user = result.rows[0];

    // return first user with matched credentials
    return user;
  } catch (err) {
    console.error("Error executing query", err);
  }
};

const queryEditProfile = async (username, biography, newPicture) => {
  try {
    const query =
      "UPDATE rooms SET biography = $1, picture = $2 WHERE username = $3";
    const values = [biography, newPicture, username];
    const result = await client.query(query, values);
  } catch (err) {
    console.error("Error executing query", err);
  }
};

//////////////// global?
const queryRetrievePostsbyUsername = async (username) => {
  try {
    const query = "SELECT * FROM posts WHERE username = $1";
    const values = [username];
    const result = await client.query(query, values);
    return result.rows;
  } catch (err) {
    console.error("Error executing query", err);
  }
};
////////////////

// Content Management Software Interfaces
const queryUploadPost = async (
  postTitle,
  description,
  nutritionFacts,
  image,
  mimetype,
  username
) => {
  try {
    const query =
      "INSERT INTO posts(title, description, nutritionFacts, image, mimetype, username) VALUES ($1,$2,$3,$4,$5,$6)";
    const values = [
      postTitle,
      description,
      nutritionFacts,
      image,
      mimetype,
      username,
    ];
    const result = await client.query(query, values);
    console.log("Uploaded post");
  } catch (err) {
    console.error("Error executing query", err);
  }
};

const queryUpdatePost = async (
  postTitle,
  description,
  nutritionFacts,
  image,
  username,
  postID
) => {
  try {
    const query =
      "UPDATE posts SET title = $1, description = $2, nutritionFacts = $3, image = $4 WHERE username = $5 and id = $6";
    const values = [
      postTitle,
      description,
      nutritionFacts,
      image,
      username,
      postID,
    ];
    const result = await client.query(query, values);
  } catch (err) {
    console.error("Error executing query", err);
  }
};

const queryDeletePost = async (username, postID) => {
  try {
    const query = "DELETE FROM posts WHERE username = $1 and id = $2";
    const values = [username, postID];
    const result = await client.query(query, values);
  } catch (err) {
    console.error("Error executing query", err);
  }
};

// Social Interaction Software Interfaces
const queryOtherUserInformation = async (username) => {
  try {
    const query =
      "SELECT username, biography, picture, following, follows FROM users WHERE username = $1";
    const values = [username];
    const result = await client.query(query, values);
    const otherProfile = result.rows[0];
    return otherProfile;
  } catch (err) {
    console.error("Error executing query", err);
  }
};

const queryFollowUser = async (username) => {
  try {
  } catch (err) {
    console.error("Error executing query", err);
  }
};

const queryLikePost = async (postID, selfUsername, otherUsername) => {
  try {
    const query =
      "UPDATE posts SET likes = likes + 1, liked = liked || $1 WHERE username = $2 and id = $3";
    const values = [selfUsername, otherUsername, postID];
    const result = await client.query(query, values);
  } catch (err) {
    console.error("Error executing query", err);
  }
};

module.exports = {
  querySignUpUser,
  queryLoginUser,
  queryEditProfile,
  queryUploadPost,
  queryUpdatePost,
  queryDeletePost,
  queryRetrievePostsbyUsername,
};
