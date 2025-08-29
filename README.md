# Weather Dashboard

A React-based weather application that displays current weather conditions and forecasts using the MeteoSource API.

## Features

- 🔍 City search with autocomplete suggestions
- 🌡️ Current weather conditions (temperature, feels like, humidity)
- ⏰ 12-hour hourly forecast
- 📅 5-day daily forecast
- 🌍 Temperature displayed in Fahrenheit
- 🔐 No API key required for users (handled server-side)

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd weatherApp/weather
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### 4. Start the Backend Server

```bash
cd server
npm start
```

The backend server will start on `http://localhost:5000`.

### 5. Start the Frontend (in a new terminal)

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`.

## Usage

1. **Search for a City**: Type a city name in the search bar
2. **Autocomplete**: Select from the dropdown suggestions or press Enter
3. **View Weather**: Current conditions and forecasts will display below

## Project Structure

```
├── src/                    # Frontend React application
│   ├── components/
│   │   ├── Header.jsx      # Search bar and city display
│   │   ├── Current.jsx     # Current weather conditions
│   │   └── Forecast.jsx    # Hourly and daily forecasts
│   └── App.js              # Main application component
├── server/                 # Backend Express server
│   ├── server.js           # API routes and MeteoSource integration
│   ├── package.json        # Server dependencies
│   └── .env               # Server environment variables (API key)
└── public/                 # Static assets
```

## Development

### Running Both Frontend and Backend

You need to run both the backend server and frontend simultaneously:

1. **Terminal 1 (Backend)**:
```bash
cd server
npm run dev  # Uses nodemon for auto-restart
```

2. **Terminal 2 (Frontend)**:
```bash
npm start
```

### API Endpoints

The backend provides these endpoints:
- `GET /api/search/:city` - Search for cities
- `GET /api/weather/:placeId` - Get weather data for a place

## Deployment

For production deployment:
1. Deploy the backend server to a hosting service (Heroku, Railway, etc.)
2. Update the frontend API URLs to point to your deployed backend
3. Deploy the frontend to a static hosting service (Netlify, Vercel, etc.)

## Troubleshooting

### Backend Server Issues
- Ensure the server is running on port 5000
- Check server logs for API errors
- Verify the MeteoSource API key is valid in `server/.env`

### Frontend Connection Issues
- Ensure backend server is running first
- Check that frontend is calling `http://localhost:5000`
- Verify no CORS errors in browser console

### Development Server Issues
```bash
# Clear npm cache
npm start -- --reset-cache

# Or reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_METEOSOURCE_API_KEY` | Your MeteoSource API key | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your API key is valid
3. Ensure all dependencies are installed correctly
4. Create an issue in the repository with details about the problem
