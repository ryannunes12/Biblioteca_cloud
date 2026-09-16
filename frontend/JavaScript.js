const searchForm = document.getElementById('searchForm');
const titleInput = document.getElementById('titleInput');
const resultsContainer = document.getElementById('results');
const loadingText = document.getElementById('loading');

searchForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const query = titleInput.value.trim();

    if (!query) {
        resultsContainer.innerHTML = '<p>Digite o título de um livro.</p>';
        return;
    }

    // Limpa os resultados anteriores
    resultsContainer.innerHTML = '';

    // Mostra mensagem de carregamento
    loadingText.style.display = 'block';

    try {
        // Codifica o texto para poder ser usado na URL
        const formattedQuery = encodeURIComponent(query);

        // URL correta da Open Library
        const apiUrl = `https://openlibrary.org/search.json?title=${formattedQuery}&fields=title,author_name,first_publish_year,cover_i&limit=12`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();

        // Esconde o loading
        loadingText.style.display = 'none';

        // Verifica se encontrou livros
        if (!data.docs || data.docs.length === 0) {
            resultsContainer.innerHTML = '<p>Nenhum livro encontrado.</p>';
            return;
        }

        // Exibe os livros
        data.docs.forEach(book => {
            const title = book.title || 'Título desconhecido';

            const author = book.author_name
                ? book.author_name.join(', ')
                : 'Autor desconhecido';

            const year = book.first_publish_year || 'Ano desconhecido';

            // Monta a URL da capa
            const coverUrl = book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : 'https://via.placeholder.com/150x200?text=Sem+Capa';

            // Cria o card
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';

            bookCard.innerHTML = `
                <img 
                    src="${coverUrl}" 
                    alt="Capa do livro ${title}"
                    onerror="this.src='https://via.placeholder.com/150x200?text=Sem+Capa'"
                >

                <div class="book-title">
                    ${title}
                </div>

                <div class="book-author">
                    Por: ${author}
                </div>

                <div style="
                    font-size: 12px;
                    color: #999;
                    margin-top: 5px;
                ">
                    Ano: ${year}
                </div>
            `;

            resultsContainer.appendChild(bookCard);
        });

    } catch (error) {
        console.error('Erro:', error);

        loadingText.style.display = 'none';

        resultsContainer.innerHTML = `
            <p style="color: red;">
                Ocorreu um erro ao buscar os livros.
                Verifique sua conexão e tente novamente.
            </p>
        `;
    }
});
