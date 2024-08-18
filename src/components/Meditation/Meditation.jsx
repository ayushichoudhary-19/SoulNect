import React, { useState } from 'react';
import PlaylistCard from './PlaylistCard';

const Meditation = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const playlistIds = [

    "23n1d0Y1FgWfUazEH4X69D",
    "4WPdBlFvoiVDrdpqjGQRLb",

    "3wcXgWR1cbj0VnomIHIRXO",
    "4KIIAFI5oqKfJOCM9tt6k4",
    "37i9dQZF1DWZqd5JICZI0u",

    "37i9dQZF1DWVS1recTqXhf",
    "37i9dQZF1DXaotNUt9NoYd",
    "5Q1ioC0HpMLauTOapXxmXH",
    "2fM4jTPIlOuqdZxHZSDAMS",

  ];

  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {playlistIds.map((id, index) => (
          <div key={index} onClick={() => setSelectedPlaylist(id)}>
            <PlaylistCard id={id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Meditation;