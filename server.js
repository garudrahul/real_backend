const express = require("express");
const session = require("express-session");
const cors = require("cors");
const gatekeeper = require("./middleware/gatekeeper");

const app = express();
app.use(express.json());

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(session({
  secret: "honeypot-secret",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use("/api", gatekeeper);

app.use("/api/transactions", require("./routes/transactions"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Backend running on port", PORT));