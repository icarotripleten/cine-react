const URL_API = import.meta.env.VITE_API_URL;

export async function getMovies() {
    const response = await fetch(`${URL_API}/movies`)

    if (!response.ok) {
        throw new Error("Falha ao carregar filmes", response.data)
    }

    const data = await response.json();

    return data;
}

function headersComToken(token) {
    return { "Authorization": `Bearer ${token}` };
}

export async function buscarFavoritos(token) {
    const response = await fetch(`${URL_API}/users/me/favorites`, {
        headers: headersComToken(token),
    });

    if (!response.ok) {
        throw new Error("Falha ao carregar favoritos");
    }

    return response.json();
}

export async function adicionarFavorito(token, movieId) {
    const response = await fetch(`${URL_API}/users/me/favorites/${movieId}`, {
        method: "PUT",
        headers: headersComToken(token),
    });

    if (!response.ok) {
        throw new Error("Falha ao favoritar filme");
    }

    return response.json();
}

export async function removerFavorito(token, movieId) {
    const response = await fetch(`${URL_API}/users/me/favorites/${movieId}`, {
        method: "DELETE",
        headers: headersComToken(token),
    });

    if (!response.ok) {
        throw new Error("Falha ao remover favorito");
    }

    return response.json();
}