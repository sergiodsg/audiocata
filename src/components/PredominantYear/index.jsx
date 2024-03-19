import { useEffect, useState } from "react";

export default function PredominantYear({ tracksStats }) {
  const [year, setYear] = useState(0);

  const calculateYear = () => {
    let years = [];
    for (let i = 0; i < tracksStats.items?.length; i++) {
      years.push(tracksStats.items[i].album.release_date.split("-")[0]);
    }
    let counts = {};
    let maxYear = years[0],
      maxCount = 1;

    for (let i = 0; i < years.length; i++) {
      let year = years[i];
      counts[year] = (counts[year] || 0) + 1;
      if (counts[year] > maxCount) {
        maxYear = year;
        maxCount = counts[year];
      }
    }
    setYear(maxYear);
  };

  useEffect(() => {
    calculateYear();
  }, [tracksStats]);

  return (
    <div className="card p-3 bg-base-100 shadow-x" style={{minHeight: "160px"}}>
      <h1 className="text-2xl text-black text-pretty">Predominant Year</h1>
      <div className="sm:flex">
        {tracksStats.items ? (
          <>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <div className="w-16 text-5xl">
                  📅
                </div>
              </div>
              <div className="stat-value text-black">{year}</div>
              <div className="stat-title text-xs">
                {year === new Date().getFullYear().toString() ? "You're listening to a lot of new music" : "Seems like " + year + "'s music is your favorite" }
              </div>
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
