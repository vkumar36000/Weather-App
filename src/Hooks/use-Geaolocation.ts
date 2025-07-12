import { coordinates } from '@/Api/Types';
import { useEffect, useState } from 'react'


interface GeolocationState{
    coordinates:coordinates | null;
    error:string | null;
    isLoading:boolean;
}


export function useGeolocation() {
  const [locationData, setlocationData] = useState<GeolocationState>({
        coordinates:null,
        error:null,
        isLoading:true,
  });

  const getLocation = ()=>{
    setlocationData((previ)=>({...previ, isLoading:true, error:null}));

    if (!navigator.geolocation) {
        setlocationData({
            coordinates:null,
            error:"Geolocation is not supported by the browser",
            isLoading:false,
        });
        return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
        setlocationData({
            coordinates:{
                lat:position.coords.latitude,
                lon:position.coords.longitude,
            },
            error:null,
            isLoading:false,
        })
    }, (error)=>{                                       // second argument is for error handling
       let errorMessage;
       switch (error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied.  Please enable location access."; 
            break;

        case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";    
            break;

        case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;

        default:
            errorMessage = "An unknown error occurred";
       }
     
    setlocationData({
        coordinates:null,
        error:errorMessage,
        isLoading:false,
    });  
       
    }, {
         enableHighAccuracy:true,
         timeout:5000,
         maximumAge:0,
      } 
);

  };


  useEffect(()=>{
     getLocation();
  }, [])


  return {
    ...locationData,
    getLocation,
}
}
