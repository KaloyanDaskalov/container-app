import { useEffect, useState } from 'react';

import useGeoLocation from '../../Hooks/useGeoLocation';


export default function WeatherWidget() {
    const [conditions, setConditions] = useState(null);
    const { query, location: { lat, lon } } = useGeoLocation();

    useEffect(() => {
        if (query === true && lat !== '') {
            fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=555ca0b99a84eb70b96f775092a385b5`)
                .then(res => res.json())
                .then(data => setConditions(data))
                .catch(console.log);
        }
    }, [query, lat, lon])

    return (<div>{conditions ? JSON.stringify(conditions, null, 2) : null}</div>);
}
