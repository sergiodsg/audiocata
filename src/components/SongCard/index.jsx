import { useState } from "react";
import { FastAverageColor } from "fast-average-color";

export default function SongCard({ rank, name, artists, cover, url }) {
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("#000");
  const [bgRank, setBgRank] = useState("#000");

  function onImageLoad(e) {
    new FastAverageColor().getColorAsync(e.target).then((color) => {
      setBgColor(color);
      if (color.isDark) {
        setTextColor("#fff");
        setBgRank("#000");
      } else {
        setTextColor("#000");
        setBgRank("#fff");
      }
    });
  }

  return (
    <div
      className="rounded-md m-1 p-1"
      style={{ backgroundColor: bgColor.rgb, color: textColor }}
    >
      <div className="flex items-center">
        {/* Rank */}
        <div
          className="w-8 h-8 mr-2 text-sm"
          style={{
            backgroundColor: bgRank,
            color: textColor,
            aspectRatio: "1 / 1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
          }}
        >
          {rank < 10 ? "0" + rank : rank}
        </div>

        {/* Cover */}
        <div className="mr-2 w-8 min-w-8 shadow">
          <img
            onLoad={onImageLoad}
            src={cover.replace("https://i.scdn.co", "/api/proxy")}
          />
        </div>
        {/* Name and artists */}

        <div className="flex flex-col w-8/12">
          <h1
            className="text-sm"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <a href={url} className="hover:underline underline-offset-1">
              {name}
            </a>
          </h1>
          <div className="flex gap-1">
            <p
              className="text-xs"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {artists.map((artist, index) => (
                <a
                  key={index}
                  href={artist.external_urls.spotify}
                  className="hover:underline underline-offset-1"
                >
                  {index < artists.length - 1
                    ? artist.name + ", "
                    : artist.name}
                </a>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
