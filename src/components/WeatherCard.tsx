import { Cloud, CloudRain, CloudSnow, Droplets, Sun, Wind, Eye, Thermometer } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface WeatherData {
  weather?: Array<{ main: string; description: string }>;
  main?: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind?: { speed: number };
  visibility?: number;
  rain?: { '1h'?: number; '3h'?: number };
  snow?: { '1h'?: number; '3h'?: number };
}

interface WeatherCardProps {
  data: WeatherData;
  locationName: string;
  locationType?: 'district' | 'state';
}

const WeatherCard = ({ data, locationName, locationType = 'district' }: WeatherCardProps) => {
  if (!data) return null;

  const getWeatherIcon = (weatherMain: string) => {
    const iconProps = { size: 64, className: 'drop-shadow-lg animate-float' };
    
    switch (weatherMain?.toLowerCase()) {
      case 'clear':
        return <Sun {...iconProps} className="text-accent drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]" />;
      case 'clouds':
        return <Cloud {...iconProps} className="text-muted-foreground" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain {...iconProps} className="text-primary" />;
      case 'snow':
        return <CloudSnow {...iconProps} className="text-blue-300" />;
      default:
        return <Cloud {...iconProps} className="text-muted-foreground" />;
    }
  };

  const weatherMain = data.weather?.[0]?.main || 'Clear';
  const weatherDesc = data.weather?.[0]?.description || '';
  const temp = Math.round(data.main?.temp || 0);
  const feelsLike = Math.round(data.main?.feels_like || 0);
  const humidity = data.main?.humidity || 0;
  const pressure = data.main?.pressure || 0;
  const rain = data.rain?.['1h'] || data.rain?.['3h'] || 0;
  const snow = data.snow?.['1h'] || data.snow?.['3h'] || 0;
  const windSpeed = data.wind?.speed || 0;
  const visibility = data.visibility ? (data.visibility / 1000).toFixed(1) : 0;

  return (
    <Card className="h-full glass-effect border-0 shadow-elegant-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 animate-scale-in overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardHeader className="relative pb-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold tracking-tight text-foreground">{locationName}</h3>
            <Badge variant="secondary" className="rounded-full px-3 py-1 font-medium">
              {locationType === 'district' ? '📍 Tamil Nadu District' : '🗺️ Indian State'}
            </Badge>
          </div>
          <div className="flex flex-col items-center">
            {getWeatherIcon(weatherMain)}
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="text-7xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
              {temp}°
            </span>
          </div>
          <p className="text-muted-foreground text-lg capitalize font-medium">{weatherDesc}</p>
          <p className="text-sm text-muted-foreground">Feels like {feelsLike}°C</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-colors">
            <Droplets className="text-primary flex-shrink-0" size={24} />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground font-medium">Humidity</p>
              <p className="font-bold text-foreground truncate">{humidity}%</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-colors">
            <Wind className="text-muted-foreground flex-shrink-0" size={24} />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground font-medium">Wind Speed</p>
              <p className="font-bold text-foreground truncate">{windSpeed.toFixed(1)} m/s</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-colors">
            <Eye className="text-accent flex-shrink-0" size={24} />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground font-medium">Visibility</p>
              <p className="font-bold text-foreground truncate">{visibility} km</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-colors">
            <Thermometer className="text-destructive flex-shrink-0" size={24} />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground font-medium">Pressure</p>
              <p className="font-bold text-foreground truncate">{pressure} hPa</p>
            </div>
          </div>
        </div>

        {(rain > 0 || snow > 0) && (
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2">
              {rain > 0 ? (
                <>
                  <CloudRain className="text-primary" size={20} />
                  <span className="text-sm font-medium">Rainfall: <strong>{rain} mm</strong></span>
                </>
              ) : (
                <>
                  <CloudSnow className="text-primary" size={20} />
                  <span className="text-sm font-medium">Snowfall: <strong>{snow} mm</strong></span>
                </>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
