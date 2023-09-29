export async function  setCookie (name, value, days)  {

    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000); // Calculate the expiration date
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`; // Set the cookie

}
  
export async function  getCookie(name) {

    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null; // Cookie not found

  }

