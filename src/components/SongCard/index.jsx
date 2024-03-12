import { useState } from "react";
import { FastAverageColor } from "fast-average-color";

export default function SongCard({ rank, name, artists, cover }) {
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("#000");
  function onImageLoad(e) {
    // const proxyCover = cover.replace('https://i.scdn.co', '/api');
    new FastAverageColor().getColorAsync(e.target).then((color) => {
      setBgColor(color);
      if (color.isDark) {
        setTextColor("#fff");
      }
      console.log(color);
    });
  }
  return (
    <div className="card" style={{backgroundColor: bgColor.rgb, color: textColor}}>
      <div className="flex">
        {/* Rank */}
        <div className="w-1/3">{rank < 10 ? "0" + rank : rank}</div>
        {/* Cover */}
        <div className="w-1/3">
          <div className="avatar">
            <div className="w-8 rounded-md">
              <img onLoad={onImageLoad} src={cover.replace('https://i.scdn.co', '/api')} />
            </div>
          </div>
        </div>
        {/* Name and artists */}
        <div className="w-1/3">
          <div className="flex flex-col">
            <h1 className="text-md">{name}</h1>
            <div className="flex gap-1">
              {artists.map((artist, index) => (
                <p key={index} className="text-xs">{artist.name}{index < (artists.length - 1) ? "," : ""}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
