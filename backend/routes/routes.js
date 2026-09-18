const express = require('express');
const router = express.Router();

const { pesquisarLivros } = require('../controllers/livroController');

router.get('/pesquisa', pesquisarLivros);

module.exports = router;
