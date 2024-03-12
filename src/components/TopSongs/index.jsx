import SongCard from "../SongCard";

export default function TopSongs({ trackStats }) {
  // console.log(trackStats.items[0].name);
  return (
    <div className="card mt-2 p-3 bg-base-100 shadow-x">
      <h1 className="text-2xl text-black">Top Songs</h1>
      {trackStats?.items?.slice(0, 10).map((track, index) => <SongCard key={index} rank={index + 1} name={track.name} artists={track.artists} cover={track.album.images[2].url} />)}
    </div>
  )
}
