import { useState } from 'react';
import { CommandDialog, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './ui/command'
import { Clock, Loader2, Search, Star, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { searchLocations } from '@/Hooks/use-weather';
import { useNavigate } from 'react-router-dom';
import { useSearchHistory } from '@/Hooks/useSearchHistory';
import { format } from 'date-fns';
import { useFavorites } from '@/Hooks/useFavorites';



export const CitySearch = () => {
   const [open, setopen] = useState(false);
   const [query, setquery] = useState("");
   const navigate = useNavigate()

   const {data:locations, isLoading} = searchLocations(query);
   const {history, clearHistory, addToHistory } = useSearchHistory();
   

   const handleSelect=(cityData:string)=>{
      const [lat, lon, name, country] = cityData.split("|");
     
      // add search history
      addToHistory.mutate({
        query,
        name,
        lat:parseFloat(lat),
        lon:parseFloat(lon),
        country,

      })

      setopen(false);
      navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
   }
   const { favorites } = useFavorites()

   console.log(locations);
    return (
        <>

        <Button 
        variant="outline"
        className='relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64 '
        onClick={() => setopen(true)}>
            <Search className='mr-2 h-4 w-4'/>
            Search cities...
        </Button>

            <CommandDialog open={open} onOpenChange={setopen}>
                <CommandInput 
                placeholder="  search cities... " 
                value={query}
                className='capitalize'
                onValueChange={setquery}
                />
                <CommandList>
                {favorites.length > 0 && (
                    <CommandGroup heading="Favorites">
                        {favorites.map((location) =>{

                        return <CommandItem
                        key={location.id}
                        value={`${location.lat} | ${location.lon} | ${location.name} | ${location.country}`}
                        onSelect={handleSelect}
                        >
                            <Star className='mr-2 h-4 w-4 text-yellow-500 '/>
                            <span>{location.name}</span>
                            {location.state && (
                                <span className='text-sm text-muted-foreground'> 
                                    , {location.state}
                                </span>
                            )}
                            <span className='text-sm text-muted-foreground'>
                                , {location.country}
                            </span>
                        </CommandItem>
                        })}
                    </CommandGroup>
                   )}
    
                    {history.length > 0 && (
                    <>
                    <CommandSeparator/>
                    <CommandGroup >
                        <div className='flex items-center justify-between px-2 my-2'>
                            <p className='text-xs text-muted-foreground'>
                                Recent Searches
                            </p>
                            <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>clearHistory.mutate()}
                            >
                                <XCircle className='h-4 w-4'/>clear
                            </Button>
                        </div>
                        {history.map((location) =>{

                        return <CommandItem
                        key={`${location.lat}- ${location.lon}`}
                        value={`${location.lat} | ${location.lon} | ${location.name} | ${location.country}`}
                        onSelect={handleSelect}
                        >
                            <Clock className='mr-2 h-4 w-4 text-muted-foreground '/>
                            <span>{location.name}</span>
                            {location.state && (
                                <span className='text-sm text-muted-foreground'> 
                                    , {location.state}
                                </span>
                            )}
                            <span className='text-sm text-muted-foreground'>
                                , {location.country}
                            </span>
                            <span className='ml-auto text-xs text-muted-foreground'>
                                 {format(location.searchedAt, "MMM d, h:mm  a")}
                            </span>
                        </CommandItem>
                        })}
                    </CommandGroup>
                    </>
                   )}

    <CommandSeparator/>
                    {locations && locations.length > 0 &&  (
                    <CommandGroup heading="Suggestions">
                        {isLoading && (
                            <div className='flex items-center justify-center p-4'>
                                <Loader2 className='h-4 w-4 animate-spin'/>
                            </div>
                        )}
                        {locations.map((location) => {
                            return(

                                <CommandItem
                                key={`${location.lat}- ${location.lon}`}
                                value={`${location.lat} | ${location.lon} | ${location.name} | ${location.country}`}
                                onSelect={handleSelect}
                                >
                                    <Search className='mr-2 h-4 w-4'/>
                                    <span>{location.name}</span>
                                    {location.state && (
                                        <span className='text-sm text-muted-foreground'> 
                                            , {location.state}
                                        </span>
                                    )}
                                    <span className='text-sm text-muted-foreground'>
                                        , {location.country}
                                    </span>
                                </CommandItem>   
                            );
                        })}
                    </CommandGroup>
                    )}
                    
                </CommandList>
            </CommandDialog>
        </>
    )
}
