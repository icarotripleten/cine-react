import MovieCard from './MovieCard.jsx'

function MovieList({ filmes }) {
    return (
        <>

            <ul className="catalogo">
                {
                    filmes.map((filme) => <MovieCard filme={filme} key={filme._id} />)
                }
            </ul>
        </>
    )
}

export default MovieList;