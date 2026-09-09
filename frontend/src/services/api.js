const URL_API = 'https://api.tvmaze.com';

function convertMovie(show) {
    return {
        id: show.id,
        titulo: show.name,
        ano: show.premiered ? Number(show.premiered.slice(0, 4)) : 0,
        genero: (show.genres && show.genres[0]) || "Outro",
        nota: show.rating && show.rating.average ? show.rating.average : 0,
        poster: show.image ? show.image.medium : null,
        // A API manda o resumo com tags HTML; removemos as tags e ficamos só
        // com o texto (mais simples e seguro de exibir).
        resumo: show.summary ? show.summary.replace(/<[^>]+>/g, "") : "",
    }
}

export async function getMovies() {
    const response = await fetch(`${URL_API}/shows`)

    if (!response.ok) {
        throw new Error("Falha ao carregar filmes", response.data)
    }

    const data = await response.json();

    return data.slice(0, 10).map(convertMovie);
}