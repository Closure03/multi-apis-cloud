const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { readFacturas, writeFacturas } = require('./db');

const app = express();
app.use(express.json());

app.get('/facturas', (req, res) => {
  res.json(readFacturas());
});

app.get('/facturas/:id', (req, res) => {
  const factura = readFacturas().find(f => f.id === req.params.id);
  factura ? res.json(factura) : res.status(404).send('Factura no encontrada');
});

app.get('/facturas/cliente/:cliente_id', (req, res) => {
  const facturas = readFacturas().filter(f => f.cliente_id === req.params.cliente_id);
  res.json(facturas);
});

app.post('/facturas', (req, res) => {
  const facturas = readFacturas();
  const productos = req.body.productos || [];
  const total = productos.reduce((acc, p) => acc + p.cantidad * p.precio_unitario, 0);
  const nueva = {
    id: uuidv4(),
    cliente_id: req.body.cliente_id,
    productos,
    total,
    fecha: new Date().toISOString(),
    metodo_pago: req.body.metodo_pago || 'efectivo'
  };
  facturas.push(nueva);
  writeFacturas(facturas);
  res.status(201).json(nueva);
});

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => console.log(`Facturación API corriendo en puerto ${PORT}`));