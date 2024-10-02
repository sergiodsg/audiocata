import ArtistCard from "../ArtistCard";
import SpotifyLogoBlack from "../../assets/Spotify_Logo_RGB_Black.png";
import SpotifyLogoGreen from "../../assets/Spotify_Logo_RGB_Green.png";

export default function TopArtists({ artistsStats, isDarkMode }) {
  return (
    <div
      className="card lg:mt-2 p-3 bg-base-100 shadow-x"
      style={{ minHeight: "152px" }}
    >
      <div className="flex justify-between">
        <h1 className={`text-2xl ${isDarkMode ? "text-gray-400" : "text-black"}`}>Top Artists</h1>
        {artistsStats.items && (
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
        {artistsStats.items ? (
          <>
            <div className="w-full sm:w-1/2">
              {artistsStats?.items?.slice(0, 5).map((artist, index) => (
                <ArtistCard
                  key={index}
                  rank={index + 1}
                  name={artist.name}
                  image={artist.images[2].url}
                  url={artist.external_urls.spotify}
                />
              ))}
            </div>
            <div className="w-full sm:w-1/2">
              {artistsStats.items?.slice(5, 10).map((artist, index) => (
                <ArtistCard
                  key={index}
                  rank={index + 6}
                  name={artist.name}
                  image={artist.images[2].url}
                  url={artist.external_urls.spotify}
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
