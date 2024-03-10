import React from 'react';
import PlaylistCard from './PlaylistCard';

const Meditation = () => {
  const playlistIds = [
    "2fM4jTPIlOuqdZxHZSDAMS",
    "4WPdBlFvoiVDrdpqjGQRLb",
    "5Q1ioC0HpMLauTOapXxmXH",
    "3wcXgWR1cbj0VnomIHIRXO"
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
