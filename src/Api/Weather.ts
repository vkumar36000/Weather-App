import { API_CONFIG } from "./Config";
import { coordinates, ForecastData, GeocodingResponse, WeatherData } from "./Types";

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


     async reverseGeocode({lat, lon}: coordinates): Promise<GeocodingResponse[]>{
        const url = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
         lat: lat.toString(),
         lon: lon.toString(),
         limit:1,
        })
 
        return this.fetchData<GeocodingResponse[]>(url);
     };
     

     async searchLocations(query: string): Promise<GeocodingResponse[]>{
        const url = this.createUrl(`${API_CONFIG.GEO}/direct`, {
         q:query, 
         limit:5,
        })
 
        return this.fetchData<GeocodingResponse[]>(url);
     };
     
}  

export const weatherAPI = new WeatherAPI();