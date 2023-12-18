export const setCookie = (cName, cValue, cExpiry=7) => {
    let date = new Date()
    date.setTime(date.getTime()+(cExpiry * 24 * 60 * 60*1000));
    const expires = "expires"+date.toUTCString();
    document.cookie = cName+"="+cValue+";"+expires;
}

export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export const deleteAllCookies = () => {
    const cookies = document.cookie.split(";");

    cookies.forEach((cookie) => {
        const [name] = cookie.trim().split("=");
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
};