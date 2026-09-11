const URL_API = 'http://localhost:3001'

export async function getUserInformation(token) {
    console.log('cheguei aqui');
    const response = await fetch(`${URL_API}/users/me`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    console.log('response', response);

    if (!response.ok) {
        throw new Error("Falha ao carregar dados do usuário logado", response.data)
    }

    return response.json();
}

export async function login(email, password) {
    const response = await fetch(
        `${URL_API}/auth/signin`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        })

    if (!response.ok) {
        throw new Error('Email ou senha inválidos');
    }

    const { token } = await response.json();
    const user = await getUserInformation(token);

    return {
        token,
        usuario: user.name || user.email,
        role: user.role
    }
}

export async function cadastrar(email, password) {
    const response = await fetch(
        `${URL_API}/auth/signup`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        })

    if (!response.ok) {
        throw new Error('Não foi possível cadastrar o usuário');
    }

    return login(email, password)
}
