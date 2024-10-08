import { useState, useEffect } from "react";

export default function PopularityGauge({ tracksStats, isDarkMode }) {
  const [popularity, setPopularity] = useState(0);

  const calculatePopularity = () => {
    const sumPopularity = tracksStats.items
      ? tracksStats.items.reduce((acc, curr) => acc + curr.popularity, 0)
      : 0;
    const avgPopularity = sumPopularity / tracksStats.items?.length;
    setPopularity(avgPopularity);
  };

  useEffect(() => {
    calculatePopularity();
  }, [tracksStats]);

  return (
    <div className="card mt-2 p-3 bg-base-100 shadow-x">
      <h1 className={`text-2xl text-pretty ${isDarkMode ? "text-gray-400" : "text-black"}`}>Popularity Rank</h1>
      <div className="sm:flex">
        {tracksStats.items ? (
          <>
            <div className="stat">
              <div className="stat-figure">
                <div className="text-3xl sm:text-6xl">
                  {popularity > 75
                    ? "👩‍🎤"
                    : popularity > 50
                    ? "✨"
                    : popularity > 25
                    ? "🎹"
                    : "💽"}
                </div>
              </div>
              <div className={`stat-value ${isDarkMode ? "text-gray-400" : "text-black"}`}>{popularity}%</div>
              <div className="stat-title">
                {popularity > 75
                  ? "Super Pop"
                  : popularity > 50
                  ? "Slightly Popular"
                  : popularity > 25
                  ? "Quite Alternative"
                  : "Pure Alternative"}
              </div>
              {/* <div className="stat-desc text-black">
                {popularity > 75
                  ? "Super Pop"
                  : popularity > 50
                  ? "Pop"
                  : popularity > 25
                  ? "Alternative"
                  : "Super Alternative"}
              </div> */}
            </div>
          </>
        ) : (
          <div className="flex w-full justify-center p-5">
            <span className={`loading loading-spinner loading-md ${isDarkMode ? "text-gray-400" : "text-black"}`}></span>
          </div>
        )}
      </div>
    </div>
  );
}
