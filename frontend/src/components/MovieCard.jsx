import { useContext } from "react";
import { FavoritosContext } from "../contexts/FavoritosContext";

function MovieCard({ filme }) {
    const { favoritosIds, alternarFavorito } = useContext(FavoritosContext);

    const favoritado = favoritosIds.includes(filme.id);

    const GRADIENTES = {
        "Ficção Científica": "linear-gradient(135deg, #312e81, #0ea5e9)",
        Drama: "linear-gradient(135deg, #7f1d1d, #f59e0b)",
        Fantasia: "linear-gradient(135deg, #14532d, #84cc16)",
        Crime: "linear-gradient(135deg, #111827, #ef4444)",
        Animação: "linear-gradient(135deg, #be185d, #f9a8d4)",
        Ação: "linear-gradient(135deg, #9a3412, #facc15)",
        Terror: "linear-gradient(135deg, #1f2937, #7c3aed)",
    };

    const { titulo, ano, genero, nota } = filme;

    return (<>
        <li className="movie-card">
            <div className="poster" style={{ background: GRADIENTES[genero] }}>
                <span className="poster__inicial">{titulo}</span>
                {nota >= 8 && <span className="badge-destaque">Destaque</span>}
            </div>
            <div className="movie-card__corpo">
                <h3 className="movie-card__titulo">{titulo}</h3>
                <p className="movie-card__meta">{`${genero} • ${ano}`}</p>
                <p className="movie-card__nota">{`Nota: ${nota}`}</p>
            </div>
            <button
                id="botao-card"
                type="button"
                className="btn-favoritar"
                onClick={() => alternarFavorito(filme.id)}
            >
                {favoritado ? "Remover dos favoritos" : "Favoritar"}
            </button>
        </li>
    </>)
}

export default MovieCard;