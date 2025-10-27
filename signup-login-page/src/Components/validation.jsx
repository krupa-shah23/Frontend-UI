export function validateEmail(email)
{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


export function validatePassword(password)
{
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}


export function validateUsername(username)
{
    const regex = /^[a-zA-Z0-9_]{3,15}$/;
    return regex.test(username);
}
