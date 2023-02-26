export const isValidPassword = (password: string) => {
    if (
        typeof password !== "string" ||
        password.length < 6 ||
        /[^A-Za-z0-9]+/g.test(password)
    ) {
        return false;
    }
    return true;
}

export const isValidFirstname = (name: string) => {
    if (
        typeof name !== "string" ||
        !(/^[a-zA-Z]+$/.test(name)) || name.length < 3
    ) {
        return false;
    }
    return true;
}

export const isValidDocument = (document: string) => {
    if (typeof document !== "string" || document.length !== 11 || !(/^\d+$/.test(document))) {
        return false;
    }
    return true;
}