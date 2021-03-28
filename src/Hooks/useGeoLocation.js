import { useEffect, useState } from 'react';

export default function useGeoLocation() {

    const [query, setQuery] = useState(false);
    const [location, setLocation] = useState({ lat: '', lon: '' });

    const onSuccess = location => {
        setQuery(true);
        setLocation({
            lat: location.coords.latitude,
            lon: location.coords.longitude,
        });
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccess, setQuery)
        } else {
            setQuery(true);
        }
    }, []);

    return { query, location };
}
