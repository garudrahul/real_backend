const express = require("express");
const session = require("express-session");
const cors = require("cors");
const gatekeeper = require("./middleware/gatekeeper");

const app = express();

/* -------------------- Middleware -------------------- */
app.use(express.json());

app.use(cors({
  origin: true,          // allow frontend domain
  credentials: true
}));

app.use(session({
  name: "honeypot-session",
  secret: process.env.SESSION_SECRET || "honeypot-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,        // REQUIRED for Render (HTTPS)
    sameSite: "none"     // REQUIRED for cross-domain frontend
  }
}));

/* -------------------- Gatekeeper -------------------- */
app.use("/api", gatekeeper);

/* -------------------- Routes -------------------- */
app.use("/api/transactions", require("./routes/transactions"));

/* -------------------- Health Check (optional but recommended) -------------------- */
app.get("/", (req, res) => {
  res.json({ status: "AI Honeypot Backend Running" });
});

/* -------------------- Start Server -------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
