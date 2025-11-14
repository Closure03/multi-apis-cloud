const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { readClientes, writeClientes } = require('./db');

const app = express();
app.use(express.json());

app.get('/clientes', (req, res) => {
  res.json(readClientes());
});

app.get('/clientes/:id', (req, res) => {
  const cliente = readClientes().find(c => c.id === req.params.id);
  cliente ? res.json(cliente) : res.status(404).send('Cliente no encontrado');
});

app.post('/clientes', (req, res) => {
  const clientes = readClientes();
  const nuevo = { id: uuidv4(), ...req.body };
  clientes.push(nuevo);
  writeClientes(clientes);
  res.status(201).json(nuevo);
});

app.put('/clientes/:id', (req, res) => {
  let clientes = readClientes();
  const index = clientes.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).send('Cliente no encontrado');
  clientes[index] = { ...clientes[index], ...req.body };
  writeClientes(clientes);
  res.json(clientes[index]);
});

app.delete('/clientes/:id', (req, res) => {
  let clientes = readClientes();
  const nuevos = clientes.filter(c => c.id !== req.params.id);
  if (nuevos.length === clientes.length) return res.status(404).send('Cliente no encontrado');
  writeClientes(nuevos);
  res.status(204).send();
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Clientes API corriendo en puerto ${PORT}`));