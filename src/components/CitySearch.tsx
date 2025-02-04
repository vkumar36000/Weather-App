import { useState } from 'react';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './ui/command'
import { Loader2, Search } from 'lucide-react';
import { Button } from './ui/button';
import { searchLocations } from '@/Hooks/use-weather';
import { useNavigate } from 'react-router-dom';



export const CitySearch = () => {
   const [open, setopen] = useState(false);
   const [query, setquery] = useState("");
   const navigate = useNavigate()

   const {data:locations, isLoading} = searchLocations(query);

   const handleSelect=(cityData:string)=>{
      const [lat, lon, name, country] = cityData.split("|");
     
      // add search history

      setopen(false);
      navigate(`/city/${name}??lat=${lat}&lon=${lon}`);
   }

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
                onValueChange={setquery}
                />
                <CommandList>
                    {query.length > 2 && !isLoading &&  (<CommandEmpty>No Cities found.</CommandEmpty>)}
                    <CommandGroup heading="Favorites">
                        <CommandItem>Calendar</CommandItem>
                    </CommandGroup>
    <CommandSeparator/>
                    <CommandGroup heading="Recent Searches">
                        <CommandItem>Calendar</CommandItem>
                    </CommandGroup>
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
