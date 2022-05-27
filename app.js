// Packages
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
dotenv.config({ path: "./config/.env" });

// Routes
app.use("/auth", require("./routes/auth"));

// PORT
const PORT = process.env.PORT || 5000;

// App listen on PORT
app.listen(PORT, () => {
  console.log(`PORT running on PORT ${PORT}`);
});
