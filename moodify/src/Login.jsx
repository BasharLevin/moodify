// src/Login.jsx
import { useEffect, useState } from "react";

export default function Login() {
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI; // e.g. http://127.0.0.1:5174/callback
  const AUTH_ENDPOINT = import.meta.env.VITE_SPOTIFY_AUTH_ENDPOINT;
  const SCOPES = import.meta.env.VITE_SPOTIFY_SCOPES;

  const [token, setToken] = useState(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const t = localStorage.getItem("spotify_token");
    setToken(t);
  }, []);

  const loginUrl =
    `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&response_type=token&scope=${encodeURIComponent(SCOPES)}`;

  const handleLogin = () => (window.location.href = loginUrl);

  const fetchRecentlyPlayed = async () => {
    if (!token) return;
    const res = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=5", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 401) {
      // token expired
      localStorage.removeItem("spotify_token");
      setToken(null);
      alert("Session expired. Please log in again.");
      return;
    }
    const data = await res.json();
    setTracks(data.items ?? []);
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Moodify 🎧</h1>

      {!token ? (
        <button onClick={handleLogin}>Log in with Spotify</button>
      ) : (
        <>
          <p>✅ Logged in</p>
          <button onClick={fetchRecentlyPlayed}>Load recently played</button>
          <ul>
            {tracks.map((it, i) => (
              <li key={i}>
                {it.track?.name} — {it.track?.artists?.map(a => a.name).join(", ")}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
