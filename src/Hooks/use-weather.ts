// we are wishing to fetch the geological data that gives us the latitude and longitute and also city-Name. which will be used by us
//  fetch weather data based on specific city name and lat and lon
import { coordinates } from "@/Api/Types";
import { weatherAPI } from "@/Api/Weather";
import { useQuery } from "@tanstack/react-query";




export const WEATHER_KEY ={
    weather:(coords:coordinates) =>["weather", coords] as const,
    forecast:(coords:coordinates) =>["forecast", coords] as const,
    location:(coords:coordinates) =>["location", coords] as const,
    search:(query:string) =>["location-search", query] as const,

} as const;

export function useWeahterQuery(Coordinates:coordinates | null) {
    return useQuery({
       queryKey:WEATHER_KEY.weather(Coordinates ?? {lat:0, lon:0}),
       queryFn:() =>
           Coordinates ? weatherAPI.getCurrentWeather(Coordinates):null,
       enabled: !!Coordinates,
    });
}

export function useForecastQuery(Coordinates:coordinates | null) {
    return useQuery({
       queryKey:WEATHER_KEY.forecast(Coordinates ?? {lat:0, lon:0}),
       queryFn:() =>
           Coordinates ? weatherAPI.getForecast(Coordinates):null,
       enabled: !!Coordinates,
    });
}

export function useReverseGeocodeQuery(Coordinates:coordinates | null) {
    return useQuery({
       queryKey:WEATHER_KEY.location(Coordinates ?? {lat:0, lon:0}),
       queryFn:() =>
           Coordinates ? weatherAPI.reverseGeocode(Coordinates):null,
       enabled: !!Coordinates,
    });
}

export function searchLocations(query:string) {
    return useQuery({
        queryKey:WEATHER_KEY.search(query),
        queryFn:() => weatherAPI.searchLocations(query),
        enabled: query.length >= 3,
     });
}