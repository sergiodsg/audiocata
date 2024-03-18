import SongCard from "../SongCard";

export default function TopSongs({ tracksStats }) {
  return (
    <div className="card mt-2 p-3 bg-base-100 shadow-x">
      <h1 className="text-2xl text-black">Top Songs</h1>
      <div className="sm:flex">
        {tracksStats.items ? (
          <>
            <div className="w-full sm:w-1/2">
              {tracksStats?.items?.slice(0, 5).map((track, index) => (
                <SongCard
                  key={index}
                  rank={index + 1}
                  name={track.name}
                  artists={track.artists}
                  cover={track.album.images[2].url}
                />
              ))}
            </div>
            <div className="w-full sm:w-1/2">
              {tracksStats?.items?.slice(5, 10).map((track, index) => (
                <SongCard
                  key={index}
                  rank={index + 6}
                  name={track.name}
                  artists={track.artists}
                  cover={track.album.images[2].url}
                />
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
