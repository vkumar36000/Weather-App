import { Button } from '@/components/ui/button';
import { useGeolocation } from '@/Hooks/use-Geaolocation';
import { AlertTriangle, MapPin, RefreshCcw } from 'lucide-react';
import WeatherSkeleton from '@/components/Loading-skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/Hooks/use-weather';
import CurrentWeather from '@/components/CurrentWeather_';
import HourlyTemperature from '@/components/Hourley-tempreture_';
import WeatherDetails from '@/components/WeatherDetails_';
import WeatherForecast from '@/components/WeatherForecast_';
import FavoriteCities from '@/components/FavoriteCities';





function WeatherDashboard() {
 const { coordinates, error:locationError, isLoading:locationLoading, getLocation } = useGeolocation();

 const locationQuery = useReverseGeocodeQuery(coordinates);
 const forecastQuery = useForecastQuery(coordinates);
 const weatherQuery = useWeatherQuery(coordinates);

 console.log(locationQuery);
 console.log(forecastQuery);
 console.log(weatherQuery);



 const handleRefresh = ()=>{
      getLocation();
      if (coordinates) {
        locationQuery.refetch();   
        forecastQuery.refetch();
        weatherQuery.refetch();
      }
 };

 if (locationLoading) {
    return <WeatherSkeleton/>
 }

 if (locationError) {
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Location Error</AlertTitle>
      <AlertDescription className='flex flex-col gap-4'>
        <p>{locationError}</p>
        <Button onClick={getLocation} variant={"outline"} className='w-fit'>
          <MapPin className='mr-2 h-4 w-4' />
           Enable Location
        </Button>
      </AlertDescription>
    </Alert>
  );
 }

 if (!coordinates) {
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Location required</AlertTitle>
      <AlertDescription className='flex flex-col gap-4'>
         <p>Please enable location access to see your local weather</p>
        <Button onClick={getLocation} variant={"outline"} className='w-fit'>
          <MapPin className='mr-2 h-4 w-4' />
           Enable Location
        </Button>
      </AlertDescription>
    </Alert>
  );
 }

  const locationName = locationQuery.data?.[0];
  
  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle> Error</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>Failed to fetch weather data. please try again.</p>
          <Button onClick={handleRefresh} variant={"outline"} className='w-fit'>
            <RefreshCcw className='mr-2 h-4 w-4' />
             retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton/>
  }

  return (
    <div className='space-y-4'>
      <div><FavoriteCities/></div>
      <div className="flex items-center justify-between">
        <h1 className='text-xl font-bold tracking-tight'>My Location</h1>
        <Button
          variant={'outline'}
          size={'icon'}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCcw className={ `h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <div className="grid gap-6">
        <div className='flex flex-col lg:flex-row gap-4'>
          <CurrentWeather 
          data={weatherQuery.data}
          locationName={locationName}
          />

           <HourlyTemperature
            data={forecastQuery.data}
           />
        </div>
        <div className='grid gap-6 md:grid-cols-2 items-start'>
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data}/>
        </div>   
      </div>
    </div>
  );
}

export default WeatherDashboard;