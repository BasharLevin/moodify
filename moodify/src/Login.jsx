

const Login = () => {
    const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const REDIRECT_URL = import.meta.env.VITE_SPOTIFY_REDIRECT_ID;
    const AUTH_ENDPOINT = import.meta.env.VITE_SPOTIFY_AUTH_ENDPOINT;
    const SCOPE = import.meta.env.VITE_SPOTIFY_SCOPES;

    const loginUrl  = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=token&scope=${encodeURIComponent(SCOPES)}`;


  return (
    <div style={{textALign: "center", marginTop: "100px"}}>
        <h1>Moodify</h1>
        <a href="{loginURl}">
            <button style = {{padding: "12px 24px", fontSize: "18px"}}>
                log in with Spotify
            </button>
        </a>
    </div>
  );
};

export default Login