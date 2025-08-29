const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Your MeteoSource API key (keep this secret)
const METEOSOURCE_API_KEY = process.env.METEOSOURCE_API_KEY;

// Route to search for places
app.get('/api/search/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const searchUrl = `https://www.meteosource.com/api/v1/free/find_places?text=${encodeURIComponent(city)}&language=en&key=${METEOSOURCE_API_KEY}`;
    
    const response = await fetch(searchUrl);
    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }
    
    res.json(data);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get weather data
app.get('/api/weather/:placeId', async (req, res) => {
  try {
    const { placeId } = req.params;
    const weatherUrl = `https://www.meteosource.com/api/v1/free/point?place_id=${placeId}&sections=current%2Chourly%2Cdaily&timezone=UTC&language=en&units=metric&key=${METEOSOURCE_API_KEY}`;
    
    const response = await fetch(weatherUrl);
    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }
    
    res.json(data);
  } catch (error) {
    console.error('Weather error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
