const express = require('express');
const app = express();
const port = 3000;

// Rota GET /api/status
app.get('/api/status', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Servidor funcionando!' });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});