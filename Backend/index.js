const express = require("express");
const app = express();
app.use(express.json());
const database = require("./db/db");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 4006;
const authRouter = require("./routes/auth.routes");
const { verifyToken } = require("./utils/token");

// authentication route
app.use("/api/auth", authRouter);
app.use("/", verifyToken, async (req, res) => {
  res.end("home");
});
function serverConnection() {
  app.listen(port, () => {
    console.log(`server listening on ${port}`);
  });
}
database(serverConnection);
