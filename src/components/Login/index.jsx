import { redirectToAuthCodeFlow } from "../../spotifyAuth";
import SpotifyLogo from "../../assets/Spotify_Logo_RGB_Black.png";

export default function Login({ clientId }) {
  return (
    <div className="flex flex-col justify-center p-5 rounded-md bg-gray-300 bg-opacity-40">
      <h1 className="text-4xl text-center text-white mb-2">audiocata</h1>
      <p className="mb-2">A listening habits analyzer :)</p>
      <button className="btn" onClick={() => redirectToAuthCodeFlow(clientId)}>
        Log in with <img src={SpotifyLogo} alt="Spotify" className="w-20" style={{minWidth: "70px"}} />
      </button>
    </div>
  );
}
