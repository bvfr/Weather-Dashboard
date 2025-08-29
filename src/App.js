import { useState } from 'react';
import Header from "./components/Header";
import Current from "./components/Current";
import Forecast from "./components/Forecast";

function App() {
  // Remove the API key since we're using the backend now
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (city) => {
    console.log('🔍 Starting API call for city:', city);
    
    setLoading(true);
    setError(null);
    setWeatherData(null);
    
    try {
      // Call your backend API instead of MeteoSource directly
      const searchResponse = await fetch(`http://localhost:5000/api/search/${encodeURIComponent(city)}`);
      console.log('📡 Search Response Status:', searchResponse.status);
      
      const searchData = await searchResponse.json();
      console.log('📊 Search Data:', searchData);
      
      if (!searchResponse.ok) {
        const errorMsg = `Search API Error: ${searchResponse.status} - ${searchData.error?.message || 'Unknown error'}`;
        console.error('❌', errorMsg);
        setError(errorMsg);
        return;
      }
      
      if (searchData && Array.isArray(searchData) && searchData.length > 0) {
        const placeId = searchData[0].place_id;
        console.log('📍 Found place_id:', placeId);
        
        // Get weather data from your backend
        const weatherResponse = await fetch(`http://localhost:5000/api/weather/${placeId}`);
        console.log('🌡️ Weather Response Status:', weatherResponse.status);
        
        const weatherData = await weatherResponse.json();
        console.log('🌦️ Weather Data:', weatherData);
        
        if (weatherResponse.ok) {
          setWeatherData(weatherData);
          console.log('✅ Weather data set successfully');
        } else {
          const errorMsg = `Weather API Error: ${weatherResponse.status} - ${weatherData.error?.message || 'Unknown error'}`;
          console.error('❌', errorMsg);
          setError(errorMsg);
        }
      } else {
        const errorMsg = 'City not found in search results';
        console.error('🚫', errorMsg);
        setError(errorMsg);
      }
    } catch (error) {
      const errorMsg = `Network Error: ${error.message}`;
      console.error('💥', errorMsg, error);
      setError(errorMsg);
    } finally {
      setLoading(false);
      console.log('🏁 API call process completed');
    }
  };

  return (
    <>
      <Header onCitySelect={fetchWeatherData}/>
      {loading && <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>}
      {error && (
        <div style={{ 
          textAlign: 'center', 
          padding: '1rem', 
          margin: '1rem', 
          backgroundColor: '#ffebee', 
          border: '1px solid #f44336', 
          borderRadius: '4px',
          color: '#c62828'
        }}>
          <strong>Error:</strong> {error}
          <br />
          <small>Check the browser console for detailed debugging info.</small>
        </div>
      )}
      {weatherData && (
        <>
          <Current weatherData={weatherData.current} />
          <Forecast hourlyData={weatherData.hourly?.data} dailyData={weatherData.daily?.data} />
        </>
      )}
    </>
  );
}

export default App;
