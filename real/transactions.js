module.exports.handle = (req, res) => {
  res.json({
    source: "REAL",
    transactions: [{ id: 1, amount: 2000 }]
  });
};