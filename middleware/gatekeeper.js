const detector = require("../detector/client");

module.exports = async function(req, res, next) {
  if (req.session.mode === "HONEYPOT") {
    req.routeTarget = "HONEYPOT";
    return next();
  }

  const verdict = detector.analyze({
    query: req.query,
    body: req.body,
    headers: req.headers
  });

  if (verdict.label === "malicious") {
    req.session.mode = "HONEYPOT";
    req.session.attackType = verdict.attack;
    req.routeTarget = "HONEYPOT";
  } else {
    req.routeTarget = "REAL";
  }

  next();
}