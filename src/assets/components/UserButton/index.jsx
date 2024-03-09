import { logOff } from "../../../spotifyAuth";

export default function UserButton({ profile }) {
  return (
    <details className="dropdown">
      <summary className="m-1 btn">
        {profile?.images?.[0]?.url && (
          <div className="avatar">
            <div className="w-8 mask mask-hexagon">
              <img src={profile.images[0].url} />
            </div>
          </div>
        )}
        {profile?.display_name || (
          <span className="loading loading-spinner loading-xs"></span>
        )}
      </summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 text-black rounded-box w-36">
        <li>
          <button className="btn" onClick={logOff}>
            Log Off
          </button>
        </li>
      </ul>
    </details>
  );
}
