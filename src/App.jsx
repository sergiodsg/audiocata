import HALO from "vanta/src/vanta.halo";
import "./App.css";
import { useState, useEffect } from "react";
import { redirectToAuthCodeFlow, getAccessToken, fetchProfile } from "./spotifyAuth";

function App() {
  const clientId = import.meta.env.VITE_CLIENT_ID; // Replace with your client ID
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  const [profile, setProfile] = useState({});

  useEffect(() => {
    HALO({
      el: "#vanta",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      size: 2,
    });
  }, []);

  useEffect(() => {
    if (!code) {
      return;
    }
    (async () => {
      const accessToken = await getAccessToken(clientId, code);
      const profileData = await fetchProfile(accessToken);
      setProfile(profileData);
    })();
    console.log(profile);
  }, [code])


  return (
    <div className="background-fallback h-screen">
      <div id="vanta" className="h-screen">
        {!code ? (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-3xl text-white">Audiocata</h1>
            <button
              className="btn"
              onClick={() => redirectToAuthCodeFlow(clientId)}
            >
              Login with Spotify
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-3xl text-white">Audiocata</h1>
            {profile?.images?.[0]?.url ? <img src={profile.images[0].url} alt="" /> : <p>nada</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
