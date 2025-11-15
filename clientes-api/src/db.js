const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.json');

function readClientes() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function writeClientes(clientes) {
  fs.writeFileSync(filePath, JSON.stringify(clientes, null, 2));
}

module.exports = { readClientes, writeClientes };