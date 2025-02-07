import { useFavorites } from '@/Hooks/useFavorites';
import React from 'react'
import { ScrollArea } from './ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { useWeahterQuery } from '@/Hooks/use-weather';
import { Button } from './ui/button';
import { X } from 'lucide-react';


interface FavoriteCityTabletProps{
    id:string,
    name:string,
    lat:number,
    lon:number,
    onRemove:(id:string)=>void,
}

const FavoriteCities = () => {
   const {favorites, removeFavote} = useFavorites();

   if (!favorites.length) {
      return null;
   }
  return (
    <>
    <h1 className='text-xl font-bold tracking-tight'>
       FavoritesCities
    </h1>
    <ScrollArea className='w-full pb-4'>
        <div className='flex gap-4'>
        {favorites.map((city) => {
            return <FavoriteCityTablet key={city.id} {...city} onRemove={()=> removeFavote.mutate(city.id)} />
        })}
        </div>
    </ScrollArea>
    </>
  )
}

function FavoriteCityTablet({id, name, lat, lon, onRemove}:FavoriteCityTabletProps) {
    const navigate = useNavigate()
    const {data:weather, isLoading} = useWeahterQuery({lat, lon});

    return (
        <div 
        onClick={()=> navigate(`/city/${name}?lat=${lat}&lon=${lon}`)}
        role='button'                          //good for accessblity;
        tabIndex={0}
        className='relative flex min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md'
        >
           <Button>
               <X className='h-4 w-4'/>
           </Button>
        </div>
    )
}

export default FavoriteCities;