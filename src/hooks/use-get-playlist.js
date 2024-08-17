//this is a custom hook that fetches the playlist data from the API
import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetPlaylist = () => {
    const [playlist, setPlaylist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n', {
            headers: {
                'Authorization': `Bearer ${process.env.VITE_SPOTIFY_API_KEY}`
            }
        })
        .then((res) => {
            setPlaylist(res.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

    return { playlist, loading };
}