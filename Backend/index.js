const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { app, server } = require("./socket/socket");
// const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["*", "http://localhost:3000"],
  })
);
// run frontend from server
const dirname = path.resolve();

const database = require("./db/db");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 4006;
const authRouter = require("./routes/auth.routes");
const messageRouter = require("./routes/message.routes");
const userRouter = require("./routes/user.routes");
const verifyToken = require("./middlewares/verifyToken");

// authentication route
app.use("/api/auth", authRouter);
// message route
app.use("/api/messages", verifyToken, messageRouter);
// user route
app.use("/api/users", verifyToken, userRouter);
app.use("/api/authCheck", verifyToken, async (req, res) => {
  try {
    res.status(200).json({
      message: "Authorized User",
    });
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized User",
    });
  }
});
app.get("/home", (req, res) => {
  console.log("home");
  res.json({
    message: "home",
  });
});
app.use(express.static(path.join(dirname, "/Frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(dirname, "Frontend", "dist", "index.html"));
});
function serverConnection() {
  // app.listen(port, () => {
  //   console.log(`server listening on ${port}`);
  // });
  server.listen(port, () => {
    console.log(`server listening on ${port}`);
  });
}
database(serverConnection);
