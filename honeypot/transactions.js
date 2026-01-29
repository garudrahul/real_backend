module.exports.handle = (req, res) => {
  console.log("HONEYPOT HIT:", req.query);
  res.json({
    source: "HONEYPOT",
    transactions: [{ id: 999, amount: 9999 }]
  });
};