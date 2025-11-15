const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.json');

function readFacturas() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function writeFacturas(facturas) {
  fs.writeFileSync(filePath, JSON.stringify(facturas, null, 2));
}

module.exports = { readFacturas, writeFacturas };