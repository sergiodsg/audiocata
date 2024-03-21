import { useState, useEffect } from "react";
import SpotifyLogo from "../../assets/Spotify_Logo_RGB_Black.png";
import "./styles.css";

export default function TopGenres({ artistsStats }) {
  const [genres, setGenres] = useState([]);

  const shuffleArray = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // Mientras queden elementos para mezclar...
    while (0 !== currentIndex) {
      // Selecciona un elemento sin mezclar...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // Y lo intercambia con el elemento actual.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const [colors, setColors] = useState(
    shuffleArray(["#EFABFF", "#EDA2F2", "#DC6BAD", "#8C7AA9", "#7192BE"])
  );

  const calculateGenres = () => {
    let genres = [];
    for (let i = 0; i < artistsStats.items?.length; i++) {
      genres = [...genres, ...artistsStats.items[i].genres];
    }
    let counts = {};
    for (let i = 0; i < genres.length; i++) {
      let genre = genres[i];
      counts[genre] = (counts[genre] || 0) + 1;
    }

    let sortedGenres = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    setGenres(sortedGenres);
  };

  useEffect(() => {
    calculateGenres();
    setColors(shuffleArray(colors));
  }, [artistsStats]);

  return (
    <div
      className="card p-3 bg-base-100 shadow-x"
      style={{ minHeight: "160px" }}
    >
      <div className="flex justify-between">
        <h1 className="text-2xl text-black text-pretty">Top Genres</h1>
        {artistsStats.items && (
          <div className="pt-1 pr-1">
            <img
              src={SpotifyLogo}
              alt="Spotify"
              className="w-20"
              style={{ minWidth: "70px" }}
            />
          </div>
        )}
      </div>
      <div className="flex flex-wrap">
        {artistsStats.items ? (
          <>
            <div className="flex w-full h-20 bg-transparent rounded-md my-3">
              {genres?.map(([genre, count], index) => (
                <div
                  key={index}
                  className={
                    index == 0
                      ? "rounded-l-md"
                      : index == 4
                      ? "rounded-r-md"
                      : ""
                  }
                  style={{ flex: count, backgroundColor: colors[index] }}
                >
                  <h2 className="text-xs p-1 bar-chart">{genre}</h2>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex w-full justify-center p-5">
            <span className="loading loading-spinner loading-md text-black"></span>
          </div>
        )}
      </div>
    </div>
  );
}
