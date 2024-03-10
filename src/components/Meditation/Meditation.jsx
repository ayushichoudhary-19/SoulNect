import React from 'react';
import PlaylistCard from './PlaylistCard';

const Meditation = () => {
  const playlistIds = [
    "4KIIAFI5oqKfJOCM9tt6k4",
    "2fM4jTPIlOuqdZxHZSDAMS",
    "6SCi0osSMyQiHzcRcu0EZY",
  ];

  return (
    <div className="flex flex-wrap justify-center">
      {playlistIds.map((id, index) => (
        <PlaylistCard key={index} id={id} />
      ))}
    </div>
  );
};

export default Meditation;
