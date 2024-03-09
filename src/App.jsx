import HALO from "vanta/src/vanta.halo";
import "./App.css";
import { useState, useEffect } from "react";
import { redirectToAuthCodeFlow, getAccessToken, logOff } from "./spotifyAuth";
import { fetchProfile, fetchTop } from "./spotifyStats";

function App() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  const accessToken = window.localStorage.getItem("accessToken");
  const expirationDate = window.localStorage.getItem("expirationDate");

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
    // Caso 1: No hay 'code' y el token de acceso no es válido
    if (
      !code &&
      (!accessToken ||
        accessToken === "undefined" ||
        new Date().getTime() > expirationDate ||
        expirationDate === "NaN")
    ) {
      return;
    }

    // Caso 2: Hay 'code' pero el token de acceso no es válido
    if (
      code &&
      (!accessToken ||
        accessToken === "undefined" ||
        new Date().getTime() > expirationDate ||
        expirationDate === "NaN")
    ) {
      (async () => {
        const result = await getAccessToken(clientId, code);
        const accessToken = result.access_token;
        const expiresIn = result.expires_in;

        const expirationDate = new Date().getTime() + expiresIn * 1000;

        window.localStorage.setItem("accessToken", accessToken);
        window.localStorage.setItem(
          "expirationDate",
          expirationDate.toString()
        );

        const profileData = await fetchProfile(accessToken);
        await fetchTop(accessToken, "artists", "short_term", 10, 0);
        setProfile(profileData);
      })();
      return;
    }

    // Caso 3: Hay un token de acceso válido en el almacenamiento local
    if (
      accessToken &&
      accessToken !== "undefined" &&
      new Date().getTime() <= expirationDate &&
      expirationDate !== "NaN"
    ) {
      (async () => {
        const profileData = await fetchProfile(accessToken);
        const trackStats = await fetchTop(
          accessToken,
          "tracks",
          "long_term",
          50,
          0
        );
        const artistStats = await fetchTop(
          accessToken,
          "artists",
          "long_term",
          50,
          0
        );
        setProfile(profileData);
      })();
    }
  }, [code]);

  return (
    <div className="background-fallback h-screen">
      <div id="vanta" className="h-screen">
        {!accessToken ||
        accessToken === "undefined" ||
        new Date().getTime() > expirationDate ||
        expirationDate === "NaN" ? (
          <div className="flex items-center justify-center h-full">
            <div className="p-5 rounded-md bg-gray-300 bg-opacity-40">
              <h1 className="text-4xl text-white mb-2">Audiocata</h1>
              <p className="mb-2">A listening habits analyzer for spotify :)</p>
              <button
                className="btn"
                onClick={() => redirectToAuthCodeFlow(clientId)}
              >
                Login with Spotify 🎧
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full p-5">
            <div className="p-5 rounded-md bg-gray-300 bg-opacity-40 w-full">
              <div className="flex justify-between w-full">
                <h1 className="text-3xl text-white">Audiocata</h1>
                <details className="dropdown">
                  <summary className="m-1 btn">
                    {profile?.images?.[0]?.url && (
                      <div className="avatar">
                        <div className="w-8 mask mask-hexagon">
                          <img src={profile.images[0].url} />
                        </div>
                      </div>
                    ) }
                    {profile?.display_name || <span className="loading loading-spinner loading-xs"></span>}
                  </summary>
                  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 text-black rounded-box w-36">
                    <li>
                    <button className="btn" onClick={logOff}>Log Off</button>
                    </li>
                  </ul>
                </details>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
