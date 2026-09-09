const USUARIOS = [
    { usuario: "admin", senha: "123", role: "admin" },
    { usuario: "ana", senha: "123", role: "user" },
];

export async function login(usuario, senha) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const encontrado = USUARIOS.find(
        (u) => u.usuario === usuario && u.senha === senha
    );

    if (!encontrado) {
        throw new Error("Usuário ou senha inválidos.");
    }

    return {
        usuario: encontrado.usuario,
        role: encontrado.role,
        token: `fake-token-${encontrado.usuario}-${encontrado.role}`,
    };
}
