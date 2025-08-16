
export function getToken() {
  return localStorage.getItem("spotify_token");
}

export async function request(path, options = {}) {
  const token = getToken();

  if (!token) {
    window.location.replace("/");
    return null;
  }

  const res = await fetch(`https://api.spotify.com/v1${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("spotify_token");
    window.location.replace("/");
    return null;
  }

  const data = await res.json();

  if (!res.ok) {
    const message = data?.error?.message || `Spotify API error ${res.status}`;
    throw new Error(message);
  }

  return data; 
}

export const spotify = {
  getMe: () => request("/me"),
  getRecentlyPlayed: (limit = 20) =>
    request(`/me/player/recently-played?limit=${limit}`),
  getAudioFeatures: (ids) =>
    request(`/audio-features?ids=${ids.join(",")}`),
};
