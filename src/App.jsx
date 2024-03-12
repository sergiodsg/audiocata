import { useState, useEffect } from "react";
import HALO from "vanta/src/vanta.halo";
import { getAccessToken } from "./spotifyAuth";
import { fetchProfile, fetchTop } from "./spotifyStats";
import Login from "./components/Login";
import UserButton from "./components/UserButton";
import TopSongs from "./components/TopSongs";
import "./App.css";

function App() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  const accessToken = window.localStorage.getItem("accessToken");
  const expirationDate = window.localStorage.getItem("expirationDate");

  const [timeRange, setTimeRange] = useState("short_term");
  const [tracksStats, setTracksStats] = useState([]);
  const [artistsStats, setArtistsStats] = useState([]);

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
        const tracksData= await fetchTop(
          accessToken,
          "tracks",
          timeRange,
          50,
          0
        );
        const artistsData = await fetchTop(
          accessToken,
          "artists",
          timeRange,
          50,
          0
        );
        setProfile(profileData);
        setTracksStats(tracksData);
        setArtistsStats(artistsData);
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
        const tracksData = await fetchTop(
          accessToken,
          "tracks",
          timeRange,
          50,
          0
        );
        const artistsData = await fetchTop(
          accessToken,
          "artists",
          timeRange,
          50,
          0
        );
        setProfile(profileData);
        setTracksStats(tracksData);
        setArtistsStats(artistsData);
      })();
    }
  }, [code, timeRange]);

  return (
    <div className="background-fallback h-screen">
      <div id="vanta" className="h-screen">
        {!accessToken ||
        accessToken === "undefined" ||
        new Date().getTime() > expirationDate ||
        expirationDate === "NaN" ? (
          <div className="flex items-center justify-center h-full">
            <Login clientId={clientId} />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full p-5">
            <div className="p-5 rounded-md bg-gray-300 bg-opacity-40 w-full">
              <div className="flex justify-between items-center w-full">
                <h1 className="text-3xl text-white">Audiocata</h1>
                <UserButton profile={profile} />
              </div>
              {/* selector */}
              <div className="card mt-2 p-3 bg-base-100 shadow-xl">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Last 4 weeks</span>
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-purple-500"
                      onChange={() => setTimeRange("short_term")}
                      checked={timeRange === "short_term"}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Last 6 months</span>
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-emerald-300"
                      onChange={() => setTimeRange("medium_term")}
                      checked={timeRange === "medium_term"}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">All time</span>
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-blue-400"
                      onChange={() => setTimeRange("long_term")}
                      checked={timeRange === "long_term"}
                    />
                  </label>
                </div>
              </div>
              <TopSongs trackStats={tracksStats} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
