const express = require('express');
const cors = require('cors');

const app = express();

const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/api/status', (req, res) => {
    res.status(200).json({
        status: 'OK',
        mensagem: 'Backend da Biblioteca Cloud funcionando!'
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Backend rodando em http://localhost:${PORT}`);
});