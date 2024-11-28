const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json()); // to parse http bodies
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

const userRouter = require("./routes/user");
app.use("/user", userRouter);

const server = http.createServer(app);

server.listen(3000, () => {
  console.log("server is listening on port 3000");
});
