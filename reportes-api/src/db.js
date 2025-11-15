const fs = require('fs');
const path = require('path');

function readJSON(file) {
  const filePath = path.join(__dirname, file);
  return JSON.parse(fs.readFileSync(filePath));
}

module.exports = {
  getVentas: () => readJSON('ventas.json'),
  getProductos: () => readJSON('productos.json'),
  getClientes: () => readJSON('clientes.json')
};