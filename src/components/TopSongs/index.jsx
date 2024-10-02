import SongCard from "../SongCard";
import SpotifyLogoBlack from "../../assets/Spotify_Logo_RGB_Black.png";
import SpotifyLogoGreen from "../../assets/Spotify_Logo_RGB_Green.png";

export default function TopSongs({ tracksStats, isDarkMode }) {
  return (
    <div className="card mt-2 p-3 bg-base-100 shadow-x">
      <div className="flex justify-between">
        <h1
          className={`text-2xl ${isDarkMode ? "text-gray-400" : "text-black"}`}
        >
          Top Songs
        </h1>
        {tracksStats.items && (
          <div className="pt-1 pr-1">
            {isDarkMode ? (
              <img
                src={SpotifyLogoGreen}
                alt="Spotify"
                className="w-20"
                style={{ minWidth: "70px" }}
              />
            ) : (
              <img
                src={SpotifyLogoBlack}
                alt="Spotify"
                className="w-20"
                style={{ minWidth: "70px" }}
              />
            )}
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
                  url={track.external_urls.spotify}
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
                  url={track.external_urls.spotify}
                />
              ))}
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
