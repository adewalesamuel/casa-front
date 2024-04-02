const localStorage = typeof window !== 'undefined' ? 
window.localStorage : {getItem: () => null, setItem: () => null, 
removeItem: () => null};
const tokenName = 'utk';

const getSessionToken = () => {
    return localStorage?.getItem(tokenName) ?? null;
}

const isLoggedIn = () => {
    if (getSessionToken() === '' || !getSessionToken())
        return false;

    return true;
}

const setSessionToken = token => {
    localStorage?.setItem(tokenName, token)
}

const setUser = user => {
    localStorage?.setItem('user', JSON.stringify(user))
}

const removeSessionToken = () => {
    localStorage?.removeItem(tokenName);
    localStorage?.removeItem('user');
}

const getUser = () => {
    return {
        ...JSON.parse(localStorage?.getItem('user') ?? '{}')
    }
}

export const Auth = {
    isLoggedIn,
    getSessionToken,
    setSessionToken,
    removeSessionToken,
    getUser,
    setUser
}
