export const randomString = (len=64) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  const a = new Uint8Array(len); crypto.getRandomValues(a);
  return Array.from(a, x => chars[x % chars.length]).join("");
};
const b64url = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)))
  .replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
export const sha256 = async (str) => {
  const data = new TextEncoder().encode(str);
  return b64url(await crypto.subtle.digest("SHA-256", data));
};
