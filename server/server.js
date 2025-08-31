const express = require("express");
const connectDB = require("./config/mongodb");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

const authRoute = require("./routes/auth");
const problemRoute = require("./routes/problems");

const app = express();

const allowedOrigins = process.env.NEXT_HOST.split(",");
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoute);
app.use("/api/problems", problemRoute);

const PORT = process.env.PORT || 8002;
const configIdentity = process.env.CONFIG_IDENTITY;

app.listen(PORT, () => {
  console.log(`config identity is ${configIdentity}`);
  console.log(`Server started on port ${PORT}`);
});

