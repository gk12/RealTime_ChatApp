const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());
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
app.use("/", verifyToken, async (req, res) => {
  res.end("home");
});
function serverConnection() {
  app.listen(port, () => {
    console.log(`server listening on ${port}`);
  });
}
database(serverConnection);

// 1.43
