const express = require('express');
const { v4: uuidv4 } = require('uuid');
const {
  readInventario,
  writeInventario,
  readProveedores,
  writeProveedores
} = require('./db');

const app = express();
app.use(express.json());

// Inventario
app.get('/inventario', (req, res) => res.json(readInventario()));

app.post('/inventario', (req, res) => {
  const inventario = readInventario();
  const nuevo = { id: uuidv4(), ...req.body };
  inventario.push(nuevo);
  writeInventario(inventario);
  res.status(201).json(nuevo);
});

app.put('/inventario/:id', (req, res) => {
  let inventario = readInventario();
  const index = inventario.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).send('Producto no encontrado');
  inventario[index] = { ...inventario[index], ...req.body };
  writeInventario(inventario);
  res.json(inventario[index]);
});

app.delete('/inventario/:id', (req, res) => {
  let inventario = readInventario();
  const nuevos = inventario.filter(p => p.id !== req.params.id);
  if (nuevos.length === inventario.length) return res.status(404).send('Producto no encontrado');
  writeInventario(nuevos);
  res.status(204).send();
});

// Proveedores
app.get('/proveedores', (req, res) => res.json(readProveedores()));

app.post('/proveedores', (req, res) => {
  const proveedores = readProveedores();
  const nuevo = { id: uuidv4(), ...req.body };
  proveedores.push(nuevo);
  writeProveedores(proveedores);
  res.status(201).json(nuevo);
});

app.put('/proveedores/:id', (req, res) => {
  let proveedores = readProveedores();
  const index = proveedores.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).send('Proveedor no encontrado');
  proveedores[index] = { ...proveedores[index], ...req.body };
  writeProveedores(proveedores);
  res.json(proveedores[index]);
});

app.delete('/proveedores/:id', (req, res) => {
  let proveedores = readProveedores();
  const nuevos = proveedores.filter(p => p.id !== req.params.id);
  if (nuevos.length === proveedores.length) return res.status(404).send('Proveedor no encontrado');
  writeProveedores(nuevos);
  res.status(204).send();
});

const PORT = process.env.PORT || 8003;
app.listen(PORT, () => console.log(`Inventario API corriendo en puerto ${PORT}`));