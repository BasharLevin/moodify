import { useEffect } from "react";

export default function Callback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const verifier = localStorage.getItem("pkce_verifier");
    if (!code || !verifier) return console.error("Missing code/verifier");

    const body = new URLSearchParams({
      client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
      code_verifier: verifier,
    });

    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body
    })
      .then(r => r.json())
      .then(data => {
        if (data.access_token) {
          localStorage.setItem("spotify_token", data.access_token);
          window.location.replace("/");
        } else {
          console.error("Token error:", data);
        }
      })
      .catch(console.error);
  }, []);

  return <p style={{padding:24}}>Logging in with Spotify…</p>;
}
