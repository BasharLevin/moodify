
export default function Login() {
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  const AUTH_ENDPOINT = import.meta.env.VITE_SPOTIFY_AUTH_ENDPOINT;
  const SCOPES = import.meta.env.VITE_SPOTIFY_SCOPES;

  const loginUrl =
    `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&response_type=token&scope=${encodeURIComponent(SCOPES)}`;

  return (
    <div style={{padding:24}}>
      <h1>Moodify 🎧</h1>
      <a href={loginUrl}><button>Log in with Spotify</button></a>
    </div>
  );
}
