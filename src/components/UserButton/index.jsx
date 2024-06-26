import { logOff } from "../../spotifyAuth";

export default function UserButton({ profile }) {
  return (
    <details className="dropdown">
      <summary className="m-1 btn">
        {profile?.images?.[0]?.url && (
          <div className="avatar">
            <div className="w-6 sm:w-8 mask mask-hexagon">
              <img src={profile.images[0].url} />
            </div>
          </div>
        )}
        <div className="text-xs sm:text-sm">
          {profile?.display_name || (
            <span className="loading loading-spinner loading-xs"></span>
          )}
        </div>
      </summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 text-black rounded-box w-full">
        <li>
          <button className="btn" onClick={logOff}>
            Log Off
          </button>
        </li>
      </ul>
    </details>
  );
}
