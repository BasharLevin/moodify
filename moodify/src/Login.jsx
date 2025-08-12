// src/Login.jsx
import { useEffect, useState } from "react";
import { randomString, sha256 } from "./pkce"; // <-- make sure you have src/pkce.js

export default function Login() {
  const [token, setToken] = useState(null);
  const [me, setMe] = useState(null);
  const [recent, setRecent] = useState(null);

  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI; // e.g. http://127.0.0.1:5173/callback
  const SCOPES = import.meta.env.VITE_SPOTIFY_SCOPES;

  useEffect(() => {
    setToken(localStorage.getItem("spotify_token"));
  }, []);

  const handleLogin = async () => {
    // PKCE: create verifier & challenge
    const verifier = randomString(64);
    const challenge = await sha256(verifier);
    localStorage.setItem("pkce_verifier", verifier);

    const authUrl = new URL("https://accounts.spotify.com/authorize");
    authUrl.searchParams.set("client_id", CLIENT_ID);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
    authUrl.searchParams.set("code_challenge_method", "S256");
    authUrl.searchParams.set("code_challenge", challenge);
    authUrl.searchParams.set("scope", SCOPES);

    window.location.href = authUrl.toString();
  };

  const handleLogout = () => {
    localStorage.removeItem("spotify_token");
    localStorage.removeItem("pkce_verifier");
    window.location.replace("/");
  };

  const fetchMe = async () => {
    if (!token) return;
    const res = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMe(data);
  };

  const fetchRecent = async () => {
    if (!token) return;
    const resp = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=10", {
      headers: {Authorization: `Bearer ${token}` },
    });

    const my_recent = await resp.json();
    setRecent(my_recent);
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Moodify 🎧</h1>

      {!token ? (
        <>
          <p>Click “Log in with Spotify” to start.</p>
          <button onClick={handleLogin}>Log in</button>
        </>
      ) : (
        <>
          <p>Logged in</p>
          <button onClick={fetchMe}>Who am I?</button>
          {me && <p>Hello, {me.display_name} </p>}
          <br />
          <button onClick={fetchRecent}>Get recent</button>
          {recent && <p>Your recent songs, {recent.items.track?.name}</p>}
          <br />
          <button onClick={handleLogout}>Log out</button>
        </>
      )}
    </div>
  );
}
