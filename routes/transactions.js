const express = require("express");
const router = express.Router();
const real = require("../real/transactions");
const honeypot = require("../honeypot/transactions");

router.get("/", (req, res) => {
  if (req.routeTarget === "HONEYPOT") {
    return honeypot.handle(req, res);
  }
  return real.handle(req, res);
});

module.exports = router;