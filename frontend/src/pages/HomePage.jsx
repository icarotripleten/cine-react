import MovieList from "../components/MovieList"
import NewMovie from "../components/NewMovie"



function HomePage({ filmes, onAdicionarFilme }) {
    return (<>
        <NewMovie onAdicionarFilme={onAdicionarFilme} />
        <MovieList filmes={filmes} /></>)
}

export default HomePage