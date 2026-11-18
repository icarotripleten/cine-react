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
import { getMovies, buscarFavoritos, adicionarFavorito, removerFavorito } from './services/api.js';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import { AuthContext } from './contexts/AuthContext.js';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  let searchBarText = '';
  const [favoritosIds, setFavoritosIds] = useState([]);
  const [filmes, setFilmes] = useState([]);

  const [usuario, setUsuario] = useState(() => {
    const salvo = localStorage.getItem("usuario");
    return salvo ? JSON.parse(salvo) : null;
  });

  async function alternarFavorito(id) {
    try {
      const favoritos = favoritosIds.includes(id)
        ? await removerFavorito(usuario.token, id)
        : await adicionarFavorito(usuario.token, id);

      setFavoritosIds(favoritos.map((filme) => filme._id));
    } catch (e) {
      console.error(e);
    }
  }

  async function carregarFilmes() {
    const filmes = await getMovies();

    setFilmes(filmes);
  }

  function adicionarFilme(filme) {
    filme = { ...filme, _id: String(Date.now()) }

    const newArrayMovies = [filme, ...filmes];

    setFilmes(newArrayMovies)
  }

  useEffect(() => {
    carregarFilmes();
  }, [])

  function entrar(dadosUsuario) {
    setUsuario(dadosUsuario);
  }

  function sair() {
    setUsuario(null);
  }

  useEffect(() => {
    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
      carregarFilmes();
    } else {
      localStorage.removeItem("usuario");
    }
  }, [usuario]);

  useEffect(() => {
    if (!usuario) {
      setFavoritosIds([]);
      return;
    }

    (async () => {
      try {
        const favoritos = await buscarFavoritos(usuario.token);
        setFavoritosIds(favoritos.map((filme) => filme._id));
      } catch (e) {
        console.error(e);
      }
    })();
  }, [usuario]);

  const location = useLocation();
  const mostrarHeader = location.pathname === "/" || location.pathname === "/favoritos";

  return (
    <AuthContext.Provider value={{ usuario, entrar, sair }}>
      <FavoritosContext.Provider value={{ favoritosIds, alternarFavorito }}>

        <div className="app">
          <div id="div_name"></div>
          <main className="conteudo">
            {mostrarHeader && <Header />}

            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
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

