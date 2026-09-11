const URL_API = 'http://localhost:3001';

export async function getMovies() {
    const { token } = JSON.parse(localStorage.getItem('usuario'));

    const response = await fetch(`${URL_API}/movies`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error("Falha ao carregar filmes", response.data)
    }

    const data = await response.json();

    return data;
}