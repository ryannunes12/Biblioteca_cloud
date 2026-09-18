const { fetch, ProxyAgent } = require('undici');

const USAR_PROXY = true;

const proxyAgent = USAR_PROXY
    ? new ProxyAgent('http://172.16.0.235:3128')
    : undefined;

async function pesquisarLivros(titulo) {
    const opcoes = {};

    if (proxyAgent) {
        opcoes.dispatcher = proxyAgent;
    }

    const tituloFormatado = encodeURIComponent(titulo);

    const resposta = await fetch(
        `https://openlibrary.org/search.json?title=${tituloFormatado}&fields=title,author_name,first_publish_year,cover_i&limit=12`,
        opcoes
    );

    if (!resposta.ok) {
        throw new Error('ERRO_OPEN_LIBRARY');
    }

    const dados = await resposta.json();

    if (!dados.docs || dados.docs.length === 0) {
        return [];
    }

    return dados.docs.map(livro => ({
        titulo: livro.title || 'Título desconhecido',
        autor: livro.author_name
            ? livro.author_name.join(', ')
            : 'Autor desconhecido',
        ano: livro.first_publish_year || 'Ano desconhecido',
        capa: livro.cover_i
            ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`
            : null
    }));
}

module.exports = {
    pesquisarLivros
};