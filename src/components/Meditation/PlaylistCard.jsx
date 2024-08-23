import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const PlaylistCard = ({ id }) => {
  const [playlistData, setPlaylistData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [spotifyUrl, setSpotifyUrl] = useState(null); // New state for Spotify link
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/spotify/playlist/${id}`
        );
        setPlaylistData(response.data);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };

    fetchPlaylist();
  }, [id]);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentTrack]);

  const playTrack = (trackUrl, spotifyLink) => {
    if (trackUrl) {
      setCurrentTrack(trackUrl);
      setSpotifyUrl(spotifyLink); // Set Spotify URL for the full track
    } else {
      alert("Sorry, this track doesn't have a preview available.");
    }
  };

  const truncateTitle = (title, maxLength) => {
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
  };

  const formatDuration = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const closePopup = (e) => {
    if (e.target === e.currentTarget) {
      setShowPopup(false);
    }
  };

  return (
    <>
      {/* Playlist Card */}
      <div
        onClick={() => setShowPopup(true)}
        className="max-w-xs rounded overflow-hidden shadow-xl mx-4 my-4 cursor-pointer"
      >
        {playlistData && (
          <div>
            <img
              className="w-full"
              src={playlistData.images[0]?.url || "https://via.placeholder.com/150"}
              alt={playlistData.name}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-lg mb-2">
                {truncateTitle(playlistData.name, 20)}
              </div>
              <div className="text-gray-400 text-sm">
                <span className="font-bold">Artist: </span>
                {playlistData.owner.display_name}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Popup for Playlist Details */}
      {showPopup && playlistData && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closePopup}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full relative animate-fade-in">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-500 font-bold py-1 px-2 rounded-full"
            >
              × {/* Cross Icon for Close */}
            </button>

            <div className="flex items-center mb-4">
              {/* Playlist Image */}
              <img
                className="w-24 h-24 rounded mr-4"
                src={playlistData.images[0]?.url || "https://via.placeholder.com/150"}
                alt={playlistData.name}
              />
              <div>
                <h2 className="text-xl font-bold">{playlistData.name}</h2>
                <p className="text-gray-600">
                  By {playlistData.owner.display_name}
                </p>
              </div>
            </div>

            {/* Track List */}
            <div className="mt-4 max-h-64 overflow-y-scroll scrollbar-visible">
              <h3 className="text-lg font-bold mb-2">Tracks in Playlist:</h3>
              <ul className="text-gray-600">
                {playlistData.tracks.items.map((item, index) => (
                  <li
                    key={index}
                    className={`mb-2 cursor-pointer hover:text-blue-500 ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-soft-green"
                    } p-2 rounded`}
                    onClick={() =>
                      playTrack(item.track.preview_url, item.track.external_urls.spotify)
                    } // Pass Spotify link for full track
                  >
                    {item.track.name} -{" "}
                    {item.track.artists.map((artist) => artist.name).join(", ")}
                    <div className="text-sm text-gray-500">
                      {formatDuration(item.track.duration_ms)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Audio Player and Spotify Link */}
            {currentTrack && (
              <div className="mt-4 bg-gray-200 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  You're listening to a 30-second preview. Click below to listen to the full track on Spotify.
                </p>
                <audio ref={audioRef} controls autoPlay className="w-full">
                  <source src={currentTrack} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                {spotifyUrl && (
                  <a
                    href={spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded-lg"
                  >
                    Listen on Spotify
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PlaylistCard;
