const URL_API = import.meta.env.VITE_API_URL;

export async function getMovies() {
    const response = await fetch(`${URL_API}/movies`)

    if (!response.ok) {
        throw new Error("Falha ao carregar filmes", response.data)
    }

    const data = await response.json();

    return data;
}