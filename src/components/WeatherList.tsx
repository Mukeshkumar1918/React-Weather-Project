import WeatherCard from './WeatherCard';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Info } from 'lucide-react';

interface WeatherItem {
  name: string;
  type: 'district' | 'state';
  data: any;
}

interface WeatherListProps {
  weatherData: WeatherItem[];
  isLoading: boolean;
  error: string | null;
}

const WeatherList = ({ weatherData, isLoading, error }: WeatherListProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-10 h-10 border-4 border-accent/30 border-t-accent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }} />
          </div>
        </div>
        <p className="mt-6 text-lg font-medium text-muted-foreground">Fetching weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="animate-fade-in shadow-elegant max-w-2xl mx-auto">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="text-lg font-semibold">Error</AlertTitle>
        <AlertDescription className="text-base">{error}</AlertDescription>
      </Alert>
    );
  }

  if (!weatherData || weatherData.length === 0) {
    return (
      <Alert className="animate-fade-in shadow-elegant max-w-2xl mx-auto glass-effect border-primary/20">
        <Info className="h-5 w-5 text-primary" />
        <AlertTitle className="text-lg font-semibold">No results found</AlertTitle>
        <AlertDescription className="text-base">
          Try searching for a Tamil Nadu district or Indian state name.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
      {weatherData.map((item, index) => (
        <div 
          key={index} 
          className="animate-scale-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <WeatherCard 
            data={item.data} 
            locationName={item.name}
            locationType={item.type}
          />
        </div>
      ))}
    </div>
  );
};

export default WeatherList;
