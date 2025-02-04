import { useSearchParams } from "react-router-dom";
import { API_CONFIG } from "./Config";
import { promises } from "dns";
import { coordinates, ForecastData, GeocodingRespnse, WeatherData } from "./Types";

class WeatherAPI{
 
    private createUrl(endpoint:string, params:Record<string, string | number>){

        const searchParams = new URLSearchParams({
            appid:API_CONFIG.API_KEY,
            ...params,
        });

       console.log(`${endpoint}?${searchParams.toString()}`)
       return `${endpoint}?${searchParams.toString()}`;
    };               // private methods for make urls 


    private async fetchData<T>(url:string) : Promise<T>{                  /// we can say it is a dynamic typed
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Weather API Error");
        }
         
        return response.json();
    };                                                          // for fethcing data from server 

    async getCurrentWeather({lat, lon}: coordinates): Promise<WeatherData>{
       const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
        lat: lat.toString(),
        lon: lon.toString(),
        units:API_CONFIG.DEFAULT_PARAMS.units,
       })

       return this.fetchData<WeatherData>(url);
    };

    async getForecast({lat, lon}: coordinates): Promise<ForecastData>{
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
         lat: lat.toString(),
         lon: lon.toString(),
         units:API_CONFIG.DEFAULT_PARAMS.units,
        })
 
        return this.fetchData<ForecastData>(url);
     };


     async reverseGeocode({lat, lon}: coordinates): Promise<GeocodingRespnse[]>{
        const url = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
         lat: lat.toString(),
         lon: lon.toString(),
         Limit:1,
        })
 
        return this.fetchData<GeocodingRespnse[]>(url);
     };
     

     async searchLocations(query: string): Promise<GeocodingRespnse[]>{
        const url = this.createUrl(`${API_CONFIG.GEO}/direct`, {
         q:query, 
         Limit:5,
        })
 
        return this.fetchData<GeocodingRespnse[]>(url);
     };
     
}  

export const weatherAPI = new WeatherAPI();