const livroService = require('../services/livroService');

async function pesquisarLivros(req, res) {
    const { titulo } = req.query;

    // Verifica se o título foi informado
    if (!titulo || titulo.trim() === '') {
        return res.status(400).json({
            erro: true,
            mensagem: 'Título não informado. Digite o título de um livro.'
        });
    }

    try {
        // Consulta o service para buscar os livros
        const livros = await livroService.pesquisarLivros(titulo.trim());

        // Verifica se nenhum livro foi encontrado
        if (!livros || livros.length === 0) {
            return res.status(404).json({
                erro: true,
                mensagem: 'Nenhum livro encontrado.'
            });
        }

        // Retorna os livros encontrados
        return res.status(200).json({
            erro: false,
            resultados: livros
        });

    } catch (erro) {
        console.error('Erro no controller:', erro);

        return res.status(500).json({
            erro: true,
            mensagem: 'Erro interno ao pesquisar os livros.'
        });
    }
}

module.exports = {
    pesquisarLivros
};