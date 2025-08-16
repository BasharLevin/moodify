// src/Login.jsx
import { useEffect, useState } from "react";
import { spotify } from "./spotifyApi";
import { randomString, sha256 } from "./pkce";

export default function Login() {
  const [token, setToken] = useState(null);
  const [me, setMe] = useState(null);
  const [recent, setRecent] = useState([]);
  const [trackIds, setTrackIds] = useState([]);

  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  const SCOPES = import.meta.env.VITE_SPOTIFY_SCOPES;

  useEffect(() => {
    setToken(localStorage.getItem("spotify_token"));
  }, []);

  const handleLogin = async () => {
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
    const data = await spotify.getMe();
    setMe(data);
  };

  const fetchRecent = async () => {
    if (!token) return;
    const data = await spotify.getRecentlyPlayed(20);
    setRecent(data.items || []); 
    setTrackIds([]); 
  };


  const buildTrackIds = () => {
    const ids = recent.map((item) => item.track?.id).filter(Boolean);
    const unique = Array.from(new Set(ids));
    const top10 = unique.slice(0, 10);
    setTrackIds(top10);
    console.log("Track IDs:", top10);
  };

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
          {me && <p>Hello, {me.display_name}</p>}

          <br />

          <button onClick={fetchRecent}>Get recent</button>
          <button onClick={buildTrackIds} disabled={recent.length === 0} style={{ marginLeft: 8 }}>
            Build IDs from recent
          </button>
          {trackIds.length > 0 && <p>Collected {trackIds.length} track IDs.</p>}
          {recent.length > 0 && trackIds.length === 0 && (
            <p>No valid track IDs found yet.</p>
          )}

          {recent.length > 0 ? (
            <div>
              <h3>Your recent songs:</h3>
              <ul>
                {recent.map((item) => (
                  <li key={item.played_at}>
                    {item.track?.name} — {item.track?.artists?.map((a) => a.name).join(", ")}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No recent plays yet.</p>
          )}

          <br />
          <button onClick={handleLogout}>Log out</button>
        </>
      )}
    </div>
  );
}
