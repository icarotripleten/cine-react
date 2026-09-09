import Header from './components/Header.jsx'
import { filmes as catalogoInicial } from "./data/filmes.js"
import { useState, useEffect } from 'react';
import MovieList from './components/MovieList.jsx'
import { FavoritosContext } from './contexts/FavoritosContext.js'
import NewMovie from './components/NewMovie.jsx';
import { Routes, Route, useLocation } from 'react-router-dom'
import FavoritosPage from './pages/FavoritosPage.jsx'
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { getMovies } from './services/api.js';
import LoginPage from './pages/LoginPage.jsx';
import { AuthContext } from './contexts/AuthContext.js';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  let searchBarText = '';
  const [favoritosIds, setFavoritosIds] = useState([]);
  const [filmes, setFilmes] = useState([]);

  function alternarFavorito(id) {
    setFavoritosIds((idsAtuais) =>
      idsAtuais.includes(id)
        ? idsAtuais.filter(favId => favId !== id)
        : [...idsAtuais, id]
    );
  }

  async function carregarFilmes() {
    const filmes = await getMovies();

    setFilmes(filmes);
  }

  function adicionarFilme(filme) {
    filme = { ...filme, id: Date.now() }

    const newArrayMovies = [filme, ...filmes];

    setFilmes(newArrayMovies)
  }

  useEffect(() => {
    carregarFilmes();
  }, [])

  const [usuario, setUsuario] = useState(() => {
    const salvo = localStorage.getItem("usuario");
    return salvo ? JSON.parse(salvo) : null;
  });

  function entrar(dadosUsuario) {
    setUsuario(dadosUsuario);
  }

  function sair() {
    setUsuario(null);
  }

  useEffect(() => {
    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("usuario");
    }
  }, [usuario]);

  const location = useLocation();
  const naTelaDeLogin = location.pathname === "/login";

  return (
    <AuthContext.Provider value={{ usuario, entrar, sair }}>
      <FavoritosContext.Provider value={{ favoritosIds, alternarFavorito }}>

        <div className="app">
          <div id="div_name"></div>
          <main className="conteudo">
            {!naTelaDeLogin && <Header />}

            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage filmes={filmes} onAdicionarFilme={adicionarFilme} />
                  </ProtectedRoute>}
              />
              <Route
                path="/favoritos"
                element={
                  <ProtectedRoute roleNecessario="admin">
                    <FavoritosPage filmes={filmes} />
                  </ProtectedRoute>
                } />
              <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>


          </main>
        </div>
      </FavoritosContext.Provider>
    </AuthContext.Provider >
  )
}

export default App

