import { useState, useEffect } from "react";

export default function PopularityGauge({ tracksStats }) {
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
      <h1 className="text-2xl text-black text-pretty">Popularity Rank</h1>
      <div className="sm:flex">
        {tracksStats.items ? (
          <>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <div className="w-16 text-6xl">
                  {popularity > 75
                    ? "👩‍🎤"
                    : popularity > 50
                    ? "✨"
                    : popularity > 25
                    ? "🎹"
                    : "💽"}
                </div>
              </div>
              <div className="stat-value text-black">{popularity}%</div>
              <div className="stat-title">
                {popularity > 75
                  ? "Super Pop"
                  : popularity > 50
                  ? "Pop"
                  : popularity > 25
                  ? "Alternative"
                  : "Super Alternative"}
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
            <span className="loading loading-spinner loading-md text-black"></span>
          </div>
        )}
      </div>
    </div>
  );
}
