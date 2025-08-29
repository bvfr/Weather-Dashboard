import React from 'react';

export default function Forecast({ hourlyData, dailyData }) {
    if (!hourlyData || !dailyData) return null;

    const celsiusToFahrenheit = (celsius) => Math.round((celsius * 9/5) + 32);

    const hourlyForecast = hourlyData.slice(0, 12);
    const dailyForecast = dailyData.slice(0, 5);

    return(
        <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', margin: '1rem 0' }}>
            <h2>12-Hour Forecast</h2>
            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem' }}>
                {hourlyForecast.map((hour, index) => {
                    const time = new Date(hour.date).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
                    return (
                        <div key={index} style={{ minWidth: '80px', textAlign: 'center', padding: '0.5rem', border: '1px solid #eee', borderRadius: '4px' }}>
                            <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{time}</div>
                            <div style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>{hour.summary}</div>
                            <div style={{ fontWeight: 'bold' }}>{celsiusToFahrenheit(hour.temperature)}°F</div>
                        </div>
                    );
                })}
            </div>

            <h2>5-Day Forecast</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
                {dailyForecast.map((day, index) => {
                    const dayName = new Date(day.day).toLocaleDateString('en-US', { weekday: 'short' });
                    return (
                        <div key={index} style={{ textAlign: 'center', padding: '1rem', border: '1px solid #eee', borderRadius: '4px' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{dayName}</div>
                            <div style={{ marginBottom: '0.5rem' }}>{day.summary}</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                                {celsiusToFahrenheit(day.all_day.temperature_max)}°F
                            </div>
                            <div style={{ color: '#666' }}>
                                {celsiusToFahrenheit(day.all_day.temperature_min)}°F
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
