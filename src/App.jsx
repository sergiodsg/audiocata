import { useState, useEffect } from "react";
import HALO from "vanta/src/vanta.halo";
import { getAccessToken } from "./spotifyAuth";
import { fetchProfile, fetchTop } from "./spotifyStats";
import Login from "./components/Login";
import Footer from "./components/Footer";
import UserButton from "./components/UserButton";
import TopSongs from "./components/TopSongs";
import TopArtists from "./components/TopArtists";
import PopularityGauge from "./components/PopularityGauge";
import PredominantYear from "./components/PredominantYear";
import TopGenres from "./components/TopGenres";
import { useSpring, animated } from "@react-spring/web";
import "./App.css";

function App() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  const accessToken = window.localStorage.getItem("accessToken");
  const expirationDate = window.localStorage.getItem("expirationDate");

  const [loading, setLoading] = useState(true);

  const [timeRange, setTimeRange] = useState("short_term");
  const [tracksStats, setTracksStats] = useState([]);
  const [artistsStats, setArtistsStats] = useState([]);

  const [profile, setProfile] = useState({});

  const useDynamicAnimation = (delay) => {
    return useSpring({
      from: { opacity: 0 },
      to: { opacity: 1 },
      delay: delay,
    });
  };

  const animation200 = useDynamicAnimation(200);
  const animation400 = useDynamicAnimation(400);
  const animation425 = useDynamicAnimation(425);
  const animation450 = useDynamicAnimation(450);
  const animation475 = useDynamicAnimation(475);
  const animation500 = useDynamicAnimation(500);
  const animation525 = useDynamicAnimation(525);

  // useEffect(() => {
  //   if(!accessToken ||
  //     accessToken === "undefined" ||
  //     new Date().getTime() > expirationDate ||
  //     expirationDate === "NaN"){
  //       HALO({
  //         el: "#vanta",
  //         mouseControls: true,
  //         touchControls: true,
  //         gyroControls: false,
  //         minHeight: 200.0,
  //         minWidth: 200.0,
  //         size: 2,
  //       });
  //   }
  // }, [accessToken]);

  useEffect(() => {
    setLoading(true);
    // Caso 1: No hay 'code' y el token de acceso no es válido
    if (
      !code &&
      (!accessToken ||
        accessToken === "undefined" ||
        new Date().getTime() > expirationDate ||
        expirationDate === "NaN")
    ) {
      setTimeout(() => setLoading(false), 100);
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
      setLoading(true);
      setTracksStats([]);
      setArtistsStats([]);

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
      setTimeout(() => setLoading(false), 400);
      return;
    }

    // Caso 3: Hay un token de acceso válido en el almacenamiento local
    if (
      accessToken &&
      accessToken !== "undefined" &&
      new Date().getTime() <= expirationDate &&
      expirationDate !== "NaN"
    ) {
      setLoading(true);
      setTracksStats([]);
      setArtistsStats([]);

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
      setTimeout(() => setLoading(false), 400);
    }
  }, [code, timeRange]);

  return (
    <div className="background-fallback min-h-screen">
      {!accessToken ||
      accessToken === "undefined" ||
      new Date().getTime() > expirationDate ||
      expirationDate === "NaN" ? (
        // <div id="vanta" className="min-h-screen">
          <div className="flex flex-col items-center justify-center h-screen">
            {loading ? (
              <span className="loading loading-spinner loading-lg"></span>
            ) : (
              <animated.div style={animation200}>
                <Login clientId={clientId} />
                <Footer />
              </animated.div>
            )}
          </div>
        // </div>
      ) : (
        <div className="flex items-center justify-center w-full p-5">
          <animated.div
            style={animation200}
            className="px-5 py-3 rounded-md bg-gray-300 bg-opacity-40 w-full"
          >
            <div className="flex justify-between items-center w-full">
              <h1 className="text-3xl sm:text-4xl text-white">audiocata</h1>
              <UserButton profile={profile} />
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 p-1">
                <animated.div
                  style={animation400}
                  className="card mt-2 p-3 bg-base-100 shadow-xl"
                >
                  <div style={{ minHeight: "128px" }}>
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
                </animated.div>
                <animated.div style={animation425}>
                  <TopSongs tracksStats={tracksStats} />
                </animated.div>
              </div>
              <div className="w-full md:w-1/2 p-1">
                <animated.div style={animation425}>
                  <TopArtists artistsStats={artistsStats} />
                </animated.div>
                <animated.div style={animation475}>
                  <PopularityGauge tracksStats={tracksStats} />
                </animated.div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 p-1">
                <animated.div style={animation500}>
                  <PredominantYear tracksStats={tracksStats} />
                </animated.div>
              </div>
              <div className="w-full md:w-1/2 p-1">
                <animated.div style={animation525}>
                  <TopGenres artistsStats={artistsStats} />
                </animated.div>
              </div>
            </div>
          </animated.div>
        </div>
      )}
    </div>
  );
}

export default App;
