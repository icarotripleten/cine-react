import { useContext } from "react"
import { FavoritosContext } from "../contexts/FavoritosContext"
import MovieList from './../components/MovieList'

function FavoritosPage({ filmes }) {
    const { favoritosIds } = useContext(FavoritosContext)

    const filmesFavoritados = filmes.filter(filme => favoritosIds.includes(filme.id));

    return (
        <div>
            <h2 className="pagina__titulo">Meus Favoritos</h2>

            <MovieList filmes={filmesFavoritados}></MovieList>
        </div>
    )
}

export default FavoritosPage