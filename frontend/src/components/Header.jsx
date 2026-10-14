import { useContext } from "react";
import { FavoritosContext } from "../contexts/FavoritosContext";
import { AuthContext } from "../contexts/AuthContext";
import { NavLink, useNavigate } from 'react-router-dom'

function Header({ }) {
    const { favoritosIds } = useContext(FavoritosContext);
    const { sair } = useContext(AuthContext);
    const navigate = useNavigate();

    function aoSair() {
        sair();
        navigate("/login");
    }

    return (
        <>
            <header className="header">
                <div className="header__marca">
                    <span className="header__logo">CineReact</span>
                    <span className="header__tagline">Catálogo de Filmes</span>
                </div>

                <nav className="header__nav">
                    <NavLink to="/" className="header__link">Home</NavLink>
                    <NavLink to="/favoritos" className="header__link">Favoritos</NavLink>
                </nav>

                <div className="header__usuario">
                    <div className="header__favoritos" id="div_name">
                        {`Favoritos: ${favoritosIds.length}`}
                    </div>

                    <button type="button" className="header__sair" onClick={aoSair}>
                        Sair
                    </button>
                </div>
            </header>
        </>
    )
}

export default Header;