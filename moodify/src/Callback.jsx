// src/Callback.jsx
import { useEffect } from "react";

export default function Callback() {
  useEffect(() => {
    const hash = window.location.hash;                    // e.g. #access_token=...&token_type=Bearer&expires_in=3600
    console.log("Callback hash:", hash);                  // debug
    const token = new URLSearchParams(hash.slice(1)).get("access_token");

    if (token) {
      localStorage.setItem("spotify_token", token);
      window.location.replace("/");                       // go back home
    } else {
      console.error("No access_token found in callback hash.");
    }
  }, []);

  return <p style={{padding:24}}>Logging in with Spotify…</p>;
}
