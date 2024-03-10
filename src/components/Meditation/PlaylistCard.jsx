import React, { useState, useEffect } from 'react';

const PlaylistCard = ({ id }) => {
  const [playlistData, setPlaylistData] = useState(null);
  
  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await fetch(`https://v1.nocodeapi.com/ayushi/spotify/miQIeangXuJKXhSd/playlists?id=${id}`);
        const data = await response.json();
        setPlaylistData(data);
      } catch (error) {
        console.error('Error fetching playlist:', error);
      }
    };
    
    fetchPlaylist();
  }, [id]);

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg mx-auto mb-4">
      {playlistData && (
        <div>
          <img className="w-full" src={playlistData.images[0].url} alt={playlistData.name} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{playlistData.name}</div>
            <div className='text-gray-600 text-sm'><span className='font-bold'>Artist: </span> {playlistData.owner.display_name}</div>
          </div>
          <div className="px-6 py-4">
            <a href={playlistData.external_urls.spotify} target='_blank' rel="noopener noreferrer" className="inline-block bg-pink-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Go to Playlist</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistCard;
