const express = require('express');
const { getVentas, getProductos, getClientes } = require('./db');

const app = express();
app.use(express.json());

app.get('/reportes/ventas', (req, res) => {
  const ventas = getVentas();
  const total = ventas.reduce((acc, v) => acc + v.total, 0);
  res.json({ total_ventas: total, cantidad: ventas.length });
});

app.get('/reportes/clientes', (req, res) => {
  const clientes = getClientes();
  res.json({ total_clientes: clientes.length });
});

app.get('/reportes/productos', (req, res) => {
  const productos = getProductos();
  const resumen = productos.map(p => ({
    producto: p.nombre,
    stock: p.cantidad
  }));
  res.json(resumen);
});

app.get('/reportes/tendencias', (req, res) => {
  const ventas = getVentas();
  const conteo = {};
  ventas.forEach(v => {
    v.productos.forEach(p => {
      conteo[p.producto_id] = (conteo[p.producto_id] || 0) + p.cantidad;
    });
  });
  const tendencias = Object.entries(conteo)
    .sort((a, b) => b[1] - a[1])
    .map(([id, cantidad]) => ({ producto_id: id, cantidad }));
  res.json({ productos_mas_vendidos: tendencias.slice(0, 5) });
});

const PORT = process.env.PORT || 8004;
app.listen(PORT, () => console.log(`Reportes API corriendo en puerto ${PORT}`));