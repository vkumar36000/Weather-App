import CurrentWeather from '@/components/CurrentWeather_';
import FavoriteButton from '@/components/FavoriteButton';
import HourlyTemperature from '@/components/Hourley-tempreture_';
import WeatherSkeleton from '@/components/Loading-skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import WeatherDetails from '@/components/WeatherDetails_';
import WeatherForecast from '@/components/WeatherForecast_';
import { useForecastQuery, useWeatherQuery } from '@/Hooks/use-weather';
import { AlertTriangle } from 'lucide-react';
import { useParams, useSearchParams } from 'react-router-dom';






function CityPage() {
  const [searchParams] = useSearchParams();
  const params = useParams();

  console.log(searchParams);
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = {lat, lon};

  const forecastQuery = useForecastQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle> Error</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
             Failed to load weather data. Please try again.
        </AlertDescription>
      </Alert>
    );
  }
  
  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton/>
  }

  return <div className='space-y-4'>
  {/* <div>fevorite cities</div> */}
  <div className="flex items-center justify-between">
    <h1 className='text-3xl font-bold tracking-tight'>
      {params.cityName}, {weatherQuery.data.sys.country}
    </h1>
    <div>
    <FavoriteButton 
       data={{...weatherQuery.data, name:params.cityName}} 
    />
    </div>
  </div>

  <div className="grid gap-6">
    <div className='flex flex-col  gap-4'>
      <CurrentWeather 
      data={weatherQuery.data}
      />

       <HourlyTemperature
        data={forecastQuery.data}
       />
    </div>
    <div className='grid gap-6 md:grid-cols-2 items-start'>
      <WeatherDetails 
        data={weatherQuery.data}
        
      />
       {/* details */}
       <WeatherForecast 
       data={forecastQuery.data}/>
       {/* forecast */}
    </div>   
  </div>
</div>
}

export default CityPage;