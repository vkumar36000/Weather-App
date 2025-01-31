export interface coordinates{
    lat:number;
    lon:number;
}
export interface WeatherCondition {
    id:number;
    main:string;
    description:string;
    icon:string;
}

export interface WeatherData {
    coord:coordinates;
    weather:WeatherCondition[];
    main: {
      temp: number;
      feels_like: number,
      temp_min: number,
      temp_max: number,
      pressure: number,
      humidity: number,

   };
   wind: {
      speed: number,
      deg: number,
   };
   sys: {
       country: string,
       sunrise: number,
       sunset: number
   };
   name:string;
   dt:number;
}

export interface ForecastData {
    list: Array<{
        dt: number;
        main: WeatherData["main"];
        weather:WeatherData["weather"];
        Wind: WeatherData["wind"];
        dt_txt: string;
        }>;
        City: {
        name: string;
        country: String;
        sunrise: number;
        sunset:number;
    };   
}

export interface GeocodingRespnse {
    name:string;
    local_names?:Record<string, string>;
    lat:number;
    lon:number;
    country:string;
    state?:string;                                                               // for making objects optional when fething data from server
}