import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import WeatherList from './WeatherList';
import Footer from './Footer';
import tnDistricts from '../data/tnDistricts.json';
import indianStates from '../data/indianStates.json';
import { CloudSun } from 'lucide-react';

interface WeatherItem {
  name: string;
  type: 'district' | 'state';
  data: any;
}

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState<WeatherItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = '99e31a9ae30d2b1ba97d8ccdec425a58';

  // Fetch weather data from API
  const fetchWeather = async (lat: number, lon: number) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    
    // Check cache first
    const cacheKey = `weather_${lat}_${lon}`;
    const cached = localStorage.getItem(cacheKey);
    
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      // Cache valid for 10 minutes
      if (Date.now() - timestamp < 10 * 60 * 1000) {
        return data;
      }
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    const data = await response.json();
    
    // Cache the result
    localStorage.setItem(cacheKey, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
    
    return data;
  };

  // Load default weather (Chennai) on mount
  useEffect(() => {
    loadDefaultWeather();
  }, []);

  const loadDefaultWeather = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const chennaiCoords = tnDistricts['Chennai' as keyof typeof tnDistricts];
      const data = await fetchWeather(chennaiCoords.lat, chennaiCoords.lon);
      setWeatherData([{
        name: 'Chennai',
        type: 'district',
        data: data
      }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search
  const handleSearch = async (searchTerm: string) => {
    setIsLoading(true);
    setError(null);
    setWeatherData([]);

    try {
      const searchLower = searchTerm.toLowerCase();
      let found = false;
      let results: WeatherItem[] = [];

      // Search in TN districts (case-insensitive)
      const tnKeys = Object.keys(tnDistricts);
      for (const key of tnKeys) {
        if (key.toLowerCase().includes(searchLower)) {
          const coords = tnDistricts[key as keyof typeof tnDistricts];
          const data = await fetchWeather(coords.lat, coords.lon);
          results.push({
            name: key,
            type: 'district',
            data: data
          });
          found = true;
        }
      }

      // If not found in TN, search in Indian states
      if (!found) {
        const stateKeys = Object.keys(indianStates);
        for (const key of stateKeys) {
          if (key.toLowerCase().includes(searchLower)) {
            const coords = indianStates[key as keyof typeof indianStates];
            const data = await fetchWeather(coords.lat, coords.lon);
            results.push({
              name: key,
              type: 'state',
              data: data
            });
            found = true;
          }
        }
      }

      if (!found) {
        setError(`No location found for "${searchTerm}". Try Tamil Nadu district or Indian state names.`);
      } else {
        setWeatherData(results);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching weather data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <CloudSun className="relative text-primary animate-float" size={80} />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in-up">
            Tamil Nadu Weather
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Get real-time weather updates for all Tamil Nadu districts and Indian states
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Weather Results */}
        <WeatherList 
          weatherData={weatherData}
          isLoading={isLoading}
          error={error}
        />
      </main>

      <Footer />
    </div>
  );
};

export default WeatherApp;
