import { useEffect, useState } from 'react';

import useGeoLocation from '../../Hooks/useGeoLocation';

import Message from '../../components/UI/FormCard/Message/Message';
import Weather from '../../components/Widgets/Weather';

const options = { month: 'long', day: 'numeric', year: 'numeric' }

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

    const date = new Date().toLocaleDateString('en-US', options);

    return (
        <Message addClass='mb weather'>
            {date}
            {conditions ?
                <Weather image={conditions.weather[0].icon}>
                    {conditions.weather[0].main}/{conditions.weather[0].description} {conditions.main.temp}
                </Weather> : null}
        </Message>
    );
}
