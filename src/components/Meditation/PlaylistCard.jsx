import React, { useState, useEffect } from 'react';

const PlaylistCard = ({ id }) => {
  const [playlistData, setPlaylistData] = useState(null);
  
  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const url = `https://spotify23.p.rapidapi.com/playlist/?id=${id}`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': `${import.meta.env.VITE_RAPIDAPI_KEY}`,
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
          }
        };

        const response = await fetch(url, options);
        const data = await response.json();
        setPlaylistData(data);
      } catch (error) {
        console.error('Error fetching playlist:', error);
      }
    };
    
    fetchPlaylist();
  }, [id]);

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-xl mx-4 my-4">
      {playlistData && (
        <div>
          <img className="w-300" src={playlistData.images[0].url} alt={playlistData.name} />
          <div className="px-6 py-4">
            <div className="font-bold text-lg mb-2">{playlistData.name}</div>
            <div className='text-gray-400 text-sm'><span className='font-bold'>Artist: </span> {playlistData.owner.display_name}</div>
          </div>
          <div className="px-6 py-4">
            <a href={playlistData.external_urls.spotify} target='_blank' rel="noopener noreferrer" className="inline-block bg-soft-green hover:bg-blue-700 text-black py-2 px-4 rounded">Go to Playlist</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistCard;
