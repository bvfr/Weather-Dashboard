import React from 'react';

export default function Current({ weatherData }) {
    if (!weatherData) return null;

    const celsiusToFahrenheit = (celsius) => Math.round((celsius * 9/5) + 32);

    const temperature = celsiusToFahrenheit(weatherData.temperature);
    const summary = weatherData.summary;

    return(
        <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', margin: '1rem 0' }}>
            <h2>Current Weather</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                    {temperature}°F
                </div>
                <div>
                    <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                        {summary}
                    </div>
                </div>
            </div>
        </div>
    )
}