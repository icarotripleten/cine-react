import { useContext } from "react"
import MovieList from "../components/MovieList"
import NewMovie from "../components/NewMovie"
import { AuthContext } from "../contexts/AuthContext"

function HomePage({ filmes, onAdicionarFilme }) {
    const { usuario } = useContext(AuthContext)
    const isAdmin = usuario.role === 'admin'

    return (<>
        {isAdmin && <NewMovie onAdicionarFilme={onAdicionarFilme} />}
        <MovieList filmes={filmes} /></>)
}

export default HomePage