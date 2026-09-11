import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.js";
import { cadastrar as cadastrarApi } from "../services/auth.js";

function SignupPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [enviando, setEnviando] = useState(false);

    const { entrar } = useContext(AuthContext);
    const navigate = useNavigate();

    async function aoEnviar(event) {
        event.preventDefault();
        setErro("");
        setEnviando(true);
        try {
            const autenticado = await cadastrarApi(email, senha);
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
            <h2 className="pagina__titulo">Criar conta</h2>

            <form className="login__form" onSubmit={aoEnviar}>
                <label className="login__campo">
                    Email
                    <input
                        type="email"
                        className="login__input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="voce@email.com"
                    />
                </label>

                <label className="login__campo">
                    Senha
                    <input
                        type="password"
                        className="login__input"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="mínimo 6 caracteres"
                    />
                </label>

                {erro && <p className="erro">{erro}</p>}

                <button type="submit" className="btn-favoritar" disabled={enviando}>
                    {enviando ? "Criando..." : "Cadastrar"}
                </button>
            </form>

            <p className="login__dica">
                Já tem conta?{" "}
                <Link className="link" to="/login">
                    Entrar
                </Link>
            </p>
        </div>
    );
}

export default SignupPage;