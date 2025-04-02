export async function fetchLogin(loginId: string, password: string){
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({ loginId, password }),
    })
    return response;
}