export function login(username: string, password: string) {
    // autenticação simples fixa
    return new Promise<{ token: string }>((res, rej) => {
        setTimeout(() => {
            if (username === 'admin' && password === 'admin') {
                res({ token: 'fake-jwt-token' });
            } else {
                rej(new Error('Credenciais inválidas'));
            }
        }, 300);
    });
}