import React from 'react'

export default function Weather({ children, image }) {

	return (
		<span>
			<img
				src={`http://openweathermap.org/img/wn/${image}@2x.png`}
				alt="weather ico"
				style={{ display: 'inline-block', width: 'auto', verticalAlign: 'middle' }}
			/>
			{children} &#x2103;
		</span>
	);
}
