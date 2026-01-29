function analyze(data) {
  const input = JSON.stringify(data.query) + JSON.stringify(data.body);
  const patterns = [/or\s+1=1/i, /union\s+select/i, /--/, /;/];

  if (patterns.some(p => p.test(input))) {
    return { label: "malicious", attack: "SQL_INJECTION" };
  }
  return { label: "legitimate" };
}

module.exports = { analyze };