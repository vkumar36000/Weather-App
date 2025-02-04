import { Link } from 'react-router-dom';
import { useTheme } from '@/context/theme-provider';
import { Moon, Sun } from 'lucide-react';
import { CitySearch } from './CitySearch';


function Header() {

    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark";              // if the theme is dark so assign  "true" to isDark variable
  
    return (
    <header className='sticky top-0 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60'>
        <div className='container mx-auto flex h-16 items-center justify-between px-4'>
            <Link to={'/'}>
            <img 
            src={isDark ? "/logo.png" :"/logo2.png"} 
            alt="logo for climet" 
            className='h-14'
            />
            </Link>


            <div className='flex gap-4'>
                <CitySearch
                // data={}
                />

                {/* theme togle */}
                <div 
                onClick={()=> setTheme(isDark ? "light" : "dark")}
                className={`flex items-center cursor-pointer transition-transform duretion-500 ${isDark ? "rotate-180" : "rotate-0"}`}>
                    {isDark ? (<Sun className='h-6 w-6 text-yellow-500 rotate-0 transition-all'/>)
                    :(<Moon className='h-6 w-6 text-blue-500 rotate-0 transition-all'/>)}
                </div>
            </div>
        </div>
    </header>
  );
}


export default Header;