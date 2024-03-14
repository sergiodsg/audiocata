import ArtistCard from "../ArtistCard";

export default function TopArtists({ artistsStats }) {
  // console.log(trackStats.items[0].name);
  return (
    <div className="card mt-2 p-3 bg-base-100 shadow-x">
      <h1 className="text-2xl text-black">Top Artists✨</h1>
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