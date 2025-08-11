// src/Callback.jsx
import { useEffect } from "react";

export default function Callback() {
  useEffect(() => {
    const hash = window.location.hash; // #access_token=...&...
    const token = new URLSearchParams(hash.slice(1)).get("access_token");
    if (token) {
      localStorage.setItem("spotify_token", token);
      window.location.replace("/"); // back to home
    }
  }, []);
  return <p style={{padding:24}}>Logging in with Spotify…</p>;
}
