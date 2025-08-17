export const spotify = {
  async fetch(endpoint) {
    const token = localStorage.getItem("spotify_token");
    if (!token) throw new Error("No token available");

    const resp = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!resp.ok) {
      console.error("Spotify API error", resp.status, await resp.text());
      return {};
    }

    return resp.json();
  },

  getMe() {
    return this.fetch("me");
  },

  getRecentlyPlayed(limit = 20) {
    return this.fetch(`me/player/recently-played?limit=${limit}`);
  },

  getAudioFeatures(ids = []) {
    if (ids.length === 0) return Promise.resolve({ audio_features: [] });
    const idsParam = ids.join(",");
    return this.fetch(`audio-features?ids=${idsParam}`);
  },
};
