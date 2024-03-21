import SongCard from "../SongCard";
import SpotifyLogo from "../../assets/Spotify_Logo_RGB_Black.png";

export default function TopSongs({ tracksStats }) {
  return (
    <div className="card mt-2 p-3 bg-base-100 shadow-x">
      <div className="flex justify-between">
        <h1 className="text-2xl text-black">Top Songs</h1>
        {tracksStats.items && (
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
