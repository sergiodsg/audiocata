export async function fetchProfile(token) {
  const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  return await result.json();
}

export async function fetchTop(token, type, timeRange, limit, offset) {
  const result = await fetch(`https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}&limit=${limit}&offset=${offset}`, {
      method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  return await result.json();
}