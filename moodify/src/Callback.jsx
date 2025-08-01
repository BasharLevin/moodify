// src/Callback.jsx
import { useEffect } from "react";

const Callback = () => {
  useEffect(() => {
    const hash = window.location.hash;
    const token = new URLSearchParams(hash.substring(1)).get("access_token");

    if (token) {
      localStorage.setItem("spotify_token", token);
      window.location.href = "/";
    }
  }, []);

  return <p>Logging in with Spotify...</p>;
};

export default Callback;
