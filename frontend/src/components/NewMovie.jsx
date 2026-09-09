import { useState } from "react";

function NewMovie({ onAdicionarFilme }) {
    const [titulo, setTitulo] = useState("");
    const [genero, setGenero] = useState("");
    const [ano, setAno] = useState("");
    const [nota, setNota] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        if (!titulo)
            return alert('Campo titulo é obrigatório');

        const newMovie = {
            titulo,
            ano,
            genero,
            nota
        };

        onAdicionarFilme(newMovie)
    }


    return (
        <form className="novo-filme" onSubmit={handleSubmit}>
            <h2 className="novo-filme__titulo">Adicionar filme</h2>
            <input className="input" type="text" placeholder="Titulo" value={titulo} onChange={(event) => { setTitulo(event.target.value) }} />

            <input className="input" type="text" placeholder="Genero" value={genero} onChange={(event) => { setGenero(event.target.value) }} />

            <input className="input" type="text" placeholder="Ano" value={ano} onChange={(event) => { setAno(event.target.value) }} />

            <input className="input" type="text" placeholder="Nota" value={nota} onChange={(event) => { setNota(event.target.value) }} />

            <button className="btn-adicionar" type="submit">Adicionar</button>
        </form>
    )
}

export default NewMovie;