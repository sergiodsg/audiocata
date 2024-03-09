import { redirectToAuthCodeFlow } from "../../../spotifyAuth";

export default function Login({ clientId }) {
  return (
    <div className="p-5 rounded-md bg-gray-300 bg-opacity-40">
      <h1 className="text-4xl text-white mb-2">Audiocata</h1>
      <p className="mb-2">A listening habits analyzer for spotify :)</p>
      <button className="btn" onClick={() => redirectToAuthCodeFlow(clientId)}>
        Login with Spotify 🎧
      </button>
    </div>
  );
}
