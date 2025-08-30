# Weather Dashboard

A React-based weather application that displays current weather conditions and forecasts using the MeteoSource API.

## Features

- City search with autocomplete suggestions
- Current weather conditions (temperature, feels like, humidity)
- 12-hour hourly forecast
- 5-day daily forecast
- Temperature displayed in Fahrenheit

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/bvfr/Weather-Dashboard
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
└── public/                 # Static assets
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your API key is valid
3. Ensure all dependencies are installed correctly
4. Create an issue in the repository with details about the problem
