import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.js";
import { login as loginApi } from "../services/auth.js";

function LoginPage() {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [enviando, setEnviando] = useState(false);

    const { entrar } = useContext(AuthContext);
    const navigate = useNavigate();

    async function aoEnviar(event) {
        event.preventDefault();
        setErro("");
        setEnviando(true);
        console.log('oi');
        try {
            const autenticado = await loginApi(usuario, senha);
            console.log('autenticado', autenticado);

            entrar(autenticado);
            navigate("/");
        } catch (e) {
            setErro(e.message);
        } finally {
            setEnviando(false);
        }
    }

    return (
        <div className="login">
            <h2 className="pagina__titulo">Entrar</h2>

            <form className="login__form" onSubmit={aoEnviar}>
                <label className="login__campo">
                    Usuário
                    <input
                        className="login__input"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        placeholder="admin"
                    />
                </label>

                <label className="login__campo">
                    Senha
                    <input
                        type="password"
                        className="login__input"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="123"
                    />
                </label>

                {erro && <p className="erro">{erro}</p>}

                <button type="submit" className="btn-favoritar" disabled={enviando}>
                    {enviando ? "Entrando..." : "Entrar"}
                </button>
            </form>
        </div>
    );
}

export default LoginPage;
