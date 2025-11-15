const fs = require('fs');
const path = require('path');

const inventarioPath = path.join(__dirname, 'inventario.json');
const proveedoresPath = path.join(__dirname, 'proveedores.json');

function readInventario() {
  return JSON.parse(fs.readFileSync(inventarioPath));
}
function writeInventario(data) {
  fs.writeFileSync(inventarioPath, JSON.stringify(data, null, 2));
}

function readProveedores() {
  return JSON.parse(fs.readFileSync(proveedoresPath));
}
function writeProveedores(data) {
  fs.writeFileSync(proveedoresPath, JSON.stringify(data, null, 2));
}

module.exports = {
  readInventario,
  writeInventario,
  readProveedores,
  writeProveedores
};