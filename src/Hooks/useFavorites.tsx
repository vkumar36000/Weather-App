import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./useLocalStorage";


interface FavoriteCities{
    id:string,
    name:string,
    lat:number,
    lon:number,
    country:string,
    state?:string,
    addedAt:number,
}

export function useFavorites() {
    const [favorites, setfavorites] = useLocalStorage<FavoriteCities[]>("favorites", []);

    const queryClient = useQueryClient()

    const favoriteQuery = useQuery({
        queryKey:["favorites"],
        queryFn:() =>favorites,
        initialData:favorites,
        staleTime:Infinity,
    })


    const addfavorite = useMutation({
        mutationFn: async (
            city:Omit<FavoriteCities, "id" | "addedAt">
        ) =>{
            const newFavorite:FavoriteCities ={
                ...city,
                id:`${city.lat}-${city.lon}`,
                addedAt:Date.now(),
            };

            const exists =  favorites.some((fave) => fave.id === newFavorite.id);
            if (exists) return favorites;


            const newFavorites = [...favorites, newFavorite].slice(0, 10);


            setfavorites(newFavorites);
            return newFavorites;
        },
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey:["favorites"],
            });
        },
    });

    const removeFavorite = useMutation({
        mutationFn: async (cityId:string)=>{
            const newFavorites = favorites.filter((city) => city.id !== cityId);
            setfavorites(newFavorites);
            return favorites;
        },
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey:["favorites"],
            });
        },
    });


    return{
        favorites:favoriteQuery.data??[],
        addfavorite,
        removeFavorite,
        isFavorite:(lat:number, lon:number)=>  favorites.some((city) => city.lat === lat && city.lon === lon),
    };
     
}