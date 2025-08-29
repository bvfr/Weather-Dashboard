import { useState } from 'react';

export default function Header({ onCitySelect }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [currentCity, setCurrentCity] = useState('');

    const cities = [
        'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
        'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
        'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte',
        'Seattle', 'Denver', 'Boston', 'Nashville', 'Baltimore'
    ];

    const filteredCities = cities
        .filter(city => city.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 5);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        setShowSuggestions(e.target.value.length > 0);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = async () => {
        if (searchTerm.trim()) {
            setCurrentCity(searchTerm);
            onCitySelect(searchTerm);
        }
    };

    const handleSuggestionClick = (city) => {
        setSearchTerm(city);
        setShowSuggestions(false);
        setCurrentCity(city);
        onCitySelect(city);
    };

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
            <div>
                <h1 style={{ margin: '0 0 0.5rem 0' }}>Weather Dashboard</h1>
                {currentCity && (
                    <div style={{ fontSize: '1.2rem', color: '#666', fontWeight: '500' }}>
                        {currentCity}
                    </div>
                )}
            </div>
            <div style={{ position: 'relative' }}>
                <input 
                    type="text" 
                    placeholder="Search city..." 
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                {showSuggestions && filteredCities.length > 0 && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        borderTop: 'none',
                        borderRadius: '0 0 4px 4px',
                        zIndex: 1000
                    }}>
                        {filteredCities.map((city, index) => (
                            <div
                                key={index}
                                onClick={() => handleSuggestionClick(city)}
                                style={{
                                    padding: '0.5rem',
                                    cursor: 'pointer',
                                    borderBottom: index < filteredCities.length - 1 ? '1px solid #eee' : 'none'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                            >
                                {city}
                            </div>
                        ))}
                    </div>
                )}
                <button 
                    onClick={handleSearch}
                    style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}
                >
                    Search
                </button>
            </div>
        </header>
    )
}