import { useState } from 'react';
import Header from "./components/Header";
import Current from "./components/Current";
import Forecast from "./components/Forecast";

function App() {
  const apiKey = process.env.REACT_APP_METEOSOURCE_API_KEY;
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (city) => {
    console.log('🔍 Starting API call for city:', city);
    console.log('🔑 API Key available:', !!apiKey);
    console.log('🔑 API Key length:', apiKey?.length);
    console.log('🔑 API Key first 10 chars:', apiKey?.substring(0, 10) + '...');
    console.log('🔑 All env vars starting with REACT_APP:', 
      Object.keys(process.env).filter(key => key.startsWith('REACT_APP'))
    );
    
    if (!apiKey) {
      setError('API key is missing. Please check your .env file.');
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);
    
    try {
      // First, search for the place to get the place_id
      const searchUrl = `https://www.meteosource.com/api/v1/free/find_places?text=${encodeURIComponent(city)}&language=en&key=${apiKey}`;
      console.log('🌐 Search URL:', searchUrl.replace(apiKey, 'API_KEY_HIDDEN'));
      
      const searchResponse = await fetch(searchUrl);
      console.log('📡 Search Response Status:', searchResponse.status, searchResponse.statusText);
      console.log('📡 Search Response Headers:', Object.fromEntries(searchResponse.headers.entries()));
      
      const searchData = await searchResponse.json();
      console.log('📊 Search Data:', searchData);
      console.log('📊 Search Data Type:', typeof searchData);
      console.log('📊 Search Data Length:', Array.isArray(searchData) ? searchData.length : 'Not an array');
      
      if (!searchResponse.ok) {
        const errorMsg = `Search API Error: ${searchResponse.status} - ${searchData.message || JSON.stringify(searchData)}`;
        console.error('❌', errorMsg);
        setError(errorMsg);
        return;
      }
      
      if (searchData && Array.isArray(searchData) && searchData.length > 0) {
        const placeId = searchData[0].place_id;
        console.log('📍 Found place_id:', placeId);
        console.log('📍 First result:', searchData[0]);
        
        // Then get weather data using the place_id
        const weatherUrl = `https://www.meteosource.com/api/v1/free/point?place_id=${placeId}&sections=current%2Chourly%2Cdaily&timezone=UTC&language=en&units=metric&key=${apiKey}`;
        console.log('🌤️ Weather URL:', weatherUrl.replace(apiKey, 'API_KEY_HIDDEN'));
        
        const weatherResponse = await fetch(weatherUrl);
        console.log('🌡️ Weather Response Status:', weatherResponse.status, weatherResponse.statusText);
        
        const weatherData = await weatherResponse.json();
        console.log('🌦️ Weather Data:', weatherData);
        
        if (weatherResponse.ok) {
          setWeatherData(weatherData);
          console.log('✅ Weather data set successfully');
        } else {
          const errorMsg = `Weather API Error: ${weatherResponse.status} - ${weatherData.message || 'Unknown error'}`;
          console.error('❌', errorMsg);
          setError(errorMsg);
        }
      } else if (searchData && !Array.isArray(searchData)) {
        console.error('🚫 Unexpected search response format:', searchData);
        setError(`Unexpected API response format: ${JSON.stringify(searchData)}`);
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
      {!apiKey && (
        <div style={{ 
          textAlign: 'center', 
          padding: '1rem', 
          margin: '1rem', 
          backgroundColor: '#fff3e0', 
          border: '1px solid #ff9800', 
          borderRadius: '4px',
          color: '#e65100'
        }}>
          <strong>API Key Missing!</strong>
          <br />
          1. Create a .env file in your project root
          <br />
          2. Add: REACT_APP_METEOSOURCE_API_KEY=your_actual_api_key
          <br />
          3. Restart your development server
          <br />
          4. Make sure your API key is valid from MeteoSource
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
